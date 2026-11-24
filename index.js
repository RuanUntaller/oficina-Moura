require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const veiculoSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  modelo: {
    type: String,
    required: true,
    trim: true,
  },
  nome_dono: {
    type: String,
    required: true,
    trim: true,
  },
  telefone_dono: {
    type: String,
    required: true,
    trim: true,
  },
});

const Veiculo = mongoose.model('Veiculo', veiculoSchema);
const camposObrigatoriosVeiculo = ['placa', 'modelo', 'nome_dono', 'telefone_dono'];
const statusServicoPermitidos = ['aberto', 'aguardando_peca', 'finalizado'];

const servicoSchema = new mongoose.Schema({
  veiculo_id: {
    type: String,
    required: true,
    trim: true,
  },
  descricao_problema: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: statusServicoPermitidos,
    trim: true,
  },
  data_entrada: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: validarDataEntrada,
      message: 'A data de entrada deve estar no formato AAAA-MM-DD e ser válida.',
    },
  },
  servico_realizado: {
    type: String,
    trim: true,
  },
});

const Servico = mongoose.model('Servico', servicoSchema);

function validarDadosVeiculo(dados) {
  return dados
    && camposObrigatoriosVeiculo.every((campo) => (
      typeof dados[campo] === 'string' && dados[campo].trim().length > 0
    ));
}

function validarDataEntrada(data) {
  if (typeof data !== 'string') {
    return false;
  }

  const correspondencia = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data);
  if (!correspondencia || correspondencia[0] !== data) {
    return false;
  }

  const ano = Number(correspondencia[1]);
  const mes = Number(correspondencia[2]);
  const dia = Number(correspondencia[3]);
  const anoBissexto = ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0);
  const diasPorMes = [31, anoBissexto ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return ano > 0 && mes >= 1 && mes <= 12 && dia >= 1 && dia <= diasPorMes[mes - 1];
}

function validarDadosServico(dados) {
  const camposPermitidos = [
    'veiculo_id',
    'descricao_problema',
    'status',
    'data_entrada',
    'servico_realizado',
  ];

  return dados
    && typeof dados === 'object'
    && !Array.isArray(dados)
    && Object.keys(dados).every((campo) => camposPermitidos.includes(campo))
    && ['veiculo_id', 'descricao_problema', 'status', 'data_entrada'].every((campo) => (
      typeof dados[campo] === 'string' && dados[campo].trim().length > 0
    ))
    && statusServicoPermitidos.includes(dados.status)
    && validarDataEntrada(dados.data_entrada)
    && (!Object.hasOwn(dados, 'servico_realizado') || typeof dados.servico_realizado === 'string');
}

function validarAtualizacaoServico(dados) {
  const camposPermitidos = ['status', 'servico_realizado'];

  return dados
    && typeof dados === 'object'
    && !Array.isArray(dados)
    && Object.keys(dados).length > 0
    && Object.keys(dados).every((campo) => camposPermitidos.includes(campo))
    && (!Object.hasOwn(dados, 'status') || statusServicoPermitidos.includes(dados.status))
    && (!Object.hasOwn(dados, 'servico_realizado') || typeof dados.servico_realizado === 'string');
}

function serializarVeiculo(veiculo) {
  return {
    id: veiculo._id.toString(),
    placa: veiculo.placa,
    modelo: veiculo.modelo,
    nome_dono: veiculo.nome_dono,
    telefone_dono: veiculo.telefone_dono,
  };
}

function serializarServico(servico, veiculo) {
  return {
    id: servico._id.toString(),
    veiculo_id: servico.veiculo_id,
    descricao_problema: servico.descricao_problema,
    status: servico.status,
    data_entrada: servico.data_entrada,
    ...(servico.servico_realizado !== undefined
      ? { servico_realizado: servico.servico_realizado }
      : {}),
    placa: veiculo ? veiculo.placa : null,
    modelo: veiculo ? veiculo.modelo : null,
  };
}

function responderErroInterno(res, operacao, error) {
  console.error(`Erro ao ${operacao}:`, error.name);
  return res.status(500).json({ erro: `Não foi possível ${operacao}.` });
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado ao MongoDB com sucesso');

    await Veiculo.init();
    await Servico.init();

    app.listen(PORT, () => {
      console.log(`Backend rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
  });

app.get('/veiculos', async (req, res) => {
  try {
    const veiculos = await Veiculo.find();
    return res.status(200).json(veiculos.map(serializarVeiculo));
  } catch (error) {
    return responderErroInterno(res, 'listar veículos', error);
  }
});

app.post('/veiculos', async (req, res) => {
  if (!validarDadosVeiculo(req.body)) {
    return res.status(400).json({
      erro: 'Os campos placa, modelo, nome_dono e telefone_dono são obrigatórios.',
    });
  }

  try {
    const veiculo = await Veiculo.create(req.body);
    return res.status(201).json(serializarVeiculo(veiculo));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ erro: 'Já existe um veículo cadastrado com essa placa.' });
    }

    return responderErroInterno(res, 'cadastrar veículo', error);
  }
});

app.put('/veiculos/:id', async (req, res) => {
  if (!validarDadosVeiculo(req.body)) {
    return res.status(400).json({
      erro: 'Os campos placa, modelo, nome_dono e telefone_dono são obrigatórios.',
    });
  }

  try {
    const veiculo = await Veiculo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true },
    );

    if (!veiculo) {
      return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }

    return res.status(200).json(serializarVeiculo(veiculo));
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }
    if (error.code === 11000) {
      return res.status(409).json({ erro: 'Já existe um veículo cadastrado com essa placa.' });
    }

    return responderErroInterno(res, 'atualizar veículo', error);
  }
});

app.delete('/veiculos/:id', async (req, res) => {
  try {
    const veiculo = await Veiculo.findById(req.params.id);
    if (!veiculo) {
      return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }

    await Veiculo.findByIdAndDelete(req.params.id);
    return res.status(200).json({ mensagem: 'Veículo excluído com sucesso.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }

    return responderErroInterno(res, 'excluir veículo', error);
  }
});

app.get('/servicos', async (req, res) => {
  const filtro = {};
  if (req.query.status !== undefined) {
    if (typeof req.query.status !== 'string' || !statusServicoPermitidos.includes(req.query.status)) {
      return res.status(400).json({ erro: 'O status informado é inválido.' });
    }
    filtro.status = req.query.status;
  }

  try {
    const servicos = await Servico.find(filtro);
    const idsVeiculos = [...new Set(servicos.map((servico) => servico.veiculo_id))]
      .filter((id) => mongoose.isValidObjectId(id));
    const veiculos = await Veiculo.find({ _id: { $in: idsVeiculos } });
    const veiculosPorId = new Map(
      veiculos.map((veiculo) => [veiculo._id.toString(), veiculo]),
    );

    return res.status(200).json(servicos.map((servico) => (
      serializarServico(servico, veiculosPorId.get(servico.veiculo_id))
    )));
  } catch (error) {
    return responderErroInterno(res, 'listar ordens de serviço', error);
  }
});

app.post('/servicos', async (req, res) => {
  if (!validarDadosServico(req.body)) {
    return res.status(400).json({
      erro: 'Informe veiculo_id, descricao_problema, status e data_entrada válidos.',
    });
  }

  try {
    let veiculo;
    const idVeiculo = req.body.veiculo_id.trim();
    try {
      veiculo = await Veiculo.findById(idVeiculo);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ erro: 'O veículo informado não existe.' });
      }
      throw error;
    }

    if (!veiculo) {
      return res.status(400).json({ erro: 'O veículo informado não existe.' });
    }

    const dadosServico = {
      veiculo_id: veiculo._id.toString(),
      descricao_problema: req.body.descricao_problema,
      status: req.body.status,
      data_entrada: req.body.data_entrada,
    };
    if (Object.hasOwn(req.body, 'servico_realizado')) {
      dadosServico.servico_realizado = req.body.servico_realizado;
    }

    const servico = await Servico.create(dadosServico);
    return res.status(201).json(serializarServico(servico, veiculo));
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Os dados da ordem de serviço são inválidos.' });
    }
    return responderErroInterno(res, 'cadastrar ordem de serviço', error);
  }
});

app.put('/servicos/:id', async (req, res) => {
  if (!validarAtualizacaoServico(req.body)) {
    return res.status(400).json({
      erro: 'Informe um status válido e/ou uma descrição de serviço realizado válida.',
    });
  }

  try {
    const servico = await Servico.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true },
    );

    if (!servico) {
      return res.status(404).json({ erro: 'Ordem de serviço não encontrada.' });
    }

    const veiculo = await Veiculo.findById(servico.veiculo_id);
    return res.status(200).json(serializarServico(servico, veiculo));
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ erro: 'Ordem de serviço não encontrada.' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Os dados da ordem de serviço são inválidos.' });
    }
    return responderErroInterno(res, 'atualizar ordem de serviço', error);
  }
});

app.delete('/servicos/:id', async (req, res) => {
  try {
    const servico = await Servico.findByIdAndDelete(req.params.id);
    if (!servico) {
      return res.status(404).json({ erro: 'Ordem de serviço não encontrada.' });
    }

    return res.status(200).json({ mensagem: 'Ordem de serviço excluída com sucesso.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ erro: 'Ordem de serviço não encontrada.' });
    }
    return responderErroInterno(res, 'excluir ordem de serviço', error);
  }
});

app.get('/veiculos/:id/servicos', async (req, res) => {
  try {
    let veiculo;
    try {
      veiculo = await Veiculo.findById(req.params.id);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(404).json({ erro: 'Veículo não encontrado.' });
      }
      throw error;
    }

    if (!veiculo) {
      return res.status(404).json({ erro: 'Veículo não encontrado.' });
    }

    const servicos = await Servico.find({ veiculo_id: veiculo._id.toString() });
    return res.status(200).json(servicos.map((servico) => serializarServico(servico, veiculo)));
  } catch (error) {
    return responderErroInterno(res, 'consultar histórico de serviços', error);
  }
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend está no ar',
  });
});
