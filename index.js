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

function validarDadosVeiculo(dados) {
  return dados
    && camposObrigatoriosVeiculo.every((campo) => (
      typeof dados[campo] === 'string' && dados[campo].trim().length > 0
    ));
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

function responderErroInterno(res, operacao, error) {
  console.error(`Erro ao ${operacao}:`, error.name);
  return res.status(500).json({ erro: `Não foi possível ${operacao}.` });
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado ao MongoDB com sucesso');

    await Veiculo.init();

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

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend está no ar',
  });
});
