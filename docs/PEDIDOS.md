# Histórico de Pedidos de IA

## Data: 18/11/2026 | Branch: setup/deploy-inicial
- **Contexto**: Vamos trabalhar na pasta oficina-servidor, no arquivo index.js estamos usando a branch setup/deploy-inicial
- **Tarefa**: Preciso que faça o index.js conter Express, Cors, dotenv, porta dinamicamente lida de process.env.PORT || 3000 e a rota GET / com mensagem de status confirmando que o backend está no ar.
- **Restrições**: É totalmente PROIBIDO: Alterar o .env, Criar outros arquivos, Criar Pastas, Mover Arquivos e pastas, Baixar pacotes ou bibliotecas sem a minha permissão
- **Pronto quando**: arquivo index.js contiver todo o código de inicialização, middlewares, a rota GET / e o app.listen prontos para execução sem erros de sintaxe.

## Data: 19/11/2026 | Branch: docs/copilot-instructions

- **Contexto:** Projeto `oficina-servidor`. Criação de instruções permanentes para orientar futuras alterações feitas pelo Copilot.
- **Tarefa:** Criar o arquivo `.github/copilot-instructions.md`, consultando `docs/PLANO.md`, `index.js` e `package.json`.
- **Restrições:** Criar somente o arquivo solicitado; não alterar arquivos existentes, implementar funcionalidades, instalar pacotes ou inventar padrões. Não alterar, exibir ou expor o `.env`.
- **Pronto quando:** O arquivo contiver as orientações do projeto, entidades, campos, rotas, tecnologias e regras de escopo conforme o plano, registrando a divergência de `telefone_dono` sem escolher uma opção. Exibir o conteúdo completo para revisão.

## Data: 19/11/2026 | Branch: docs/copilot-instructions

- **Contexto:** Revisão do arquivo `.github/copilot-instructions.md`.
- **Tarefa:** Corrigir a versão do CORS registrada como `2.2.6`, pois o `package.json` declara `^2.8.6`.
- **Restrições:** Alterar somente essa informação no arquivo `.github/copilot-instructions.md`. Não modificar nenhum outro conteúdo ou arquivo.
- **Pronto quando:** A versão estiver corrigida para `^2.8.6`, conferida novamente no `package.json`, e o trecho corrigido for apresentado.

## Data: 23/11/2026 feature/cadastro-veiculos-backend

### Contexto

Estamos trabalhando no projeto `oficina-servidor`, na branch `feature/cadastro-veiculos-backend`. Consulte `docs/PLANO.md`, `.github/copilot-instructions.md`, `index.js` e `package.json` antes de realizar qualquer alteração. O objetivo é implementar o cadastro de veículos do sistema Oficina Moura.

### Tarefa

Implemente as operações de cadastro, listagem, edição e exclusão de veículos, seguindo o planejamento.

A entidade Veículos possui os seguintes campos:

* `placa`: texto obrigatório e identificador único.
* `modelo`: texto obrigatório.
* `nome_dono`: texto obrigatório.
* `telefone_dono`: texto obrigatório.

Implemente as rotas previstas:

* GET `/veiculos`
* POST `/veiculos`
* PUT `/veiculos/:id`
* DELETE `/veiculos/:id`

### Restrições

* Respeite as tecnologias e os padrões já utilizados no projeto.
* Não invente campos, rotas ou funcionalidades.
* Não altere, exiba ou exponha o conteúdo do `.env`.
* Não instale pacotes ou bibliotecas.
* Não altere arquivos fora do necessário para essa tarefa.
* Não implemente ordens de serviço ou funcionalidades extras.
* Preserve a estrutura existente do backend.

### Pronto quando

* As quatro operações de veículos estiverem implementadas.
* Todos os campos obrigatórios forem validados, incluindo `telefone_dono`.
* A placa tiver tratamento de unicidade.
* Os dados forem persistidos no banco de dados.
* As rotas responderem adequadamente a erros e operações inválidas.
* O código estiver integrado à estrutura atual do backend.
* Ao tentar cadastrar um veículo sem `placa`, a API deve rejeitar a solicitação e não salvar o registro.
* Ao tentar cadastrar um veículo sem `telefone_dono`, a API deve rejeitar a solicitação e não salvar o registro.
* Ao tentar editar um veículo usando um ID inexistente, a API deve responder informando que o veículo não foi encontrado.
* Ao terminar, apresente os arquivos alterados e explique o que foi implementado.

Corrija somente a rota `DELETE /veiculos/:id` em `index.js`.

Remova toda a consulta à coleção `servicos` e a verificação de serviços em aberto.

A rota deve:
- Buscar o veículo pelo ID.
- Retornar HTTP 404 se não existir.
- Excluir o veículo se existir.
- Retornar a mensagem de sucesso após a exclusão.

Não altere nenhuma outra rota, função ou arquivo. Não instale pacotes.




# feat/veiculos-frontend 24/11
Contexto

O projeto Oficina Moura possui frontend em React/Vite. O backend de veículos está concluído, publicado e funcionando em:

https://oficina-servidor.onrender.com

A API disponibiliza as rotas GET, POST, PUT e DELETE /veiculos.

Cada veículo possui os campos:
- placa
- modelo
- nome_dono
- telefone_dono
Todos são obrigatórios.

Tarefa

Implementar a interface de gerenciamento de veículos, permitindo:
- Cadastrar veículos.
- Listar veículos cadastrados.
- Editar veículos existentes.
- Excluir veículos.
Integrar as operações com as rotas disponíveis no backend.

Restrições
- Primeiro, analise a estrutura atual do projeto.
- Siga os padrões e convenções já existentes.
- Não altere o backend.
- Não instale bibliotecas ou frameworks desnecessários.
- Não modifique arquivos fora do escopo da tarefa.
- Utilize exatamente os nomes dos campos definidos pela API.
- Trate erros retornados pelo backend.
- Antes de modificar arquivos, apresente um plano de implementação para revisão.
Pronto quando
- For possível cadastrar, listar, editar e excluir veículos pela interface.
- Os quatro campos obrigatórios forem validados.
- Ao tentar salvar o formulário com algum campo obrigatório vazio, a interface deve impedir o envio e informar visualmente qual campo precisa ser preenchido.
- Antes de excluir um veículo, a interface deve exibir uma confirmação, permitindo cancelar ou confirmar a exclusão. A requisição DELETE só deve ser enviada após a confirmação.
- As operações estiverem integradas à API pública.
- Os erros retornados pelo backend forem tratados adequadamente.
- Não houver erros no console do navegador.ss


# feat/veiculos-frontend  24/11
Revise o src/index.css. Você adicionou novas regras globais ao final do arquivo, duplicando definições existentes de :root, body, #root, h1 e h2.

Organize o arquivo para evitar duplicações, mantendo as configurações necessárias para a nova interface. Preserve o visual atual, a responsividade e as demais funcionalidades. Não altere outros arquivos.

Depois, mostre o diff para revisão. Não faça commit.


# Pedido ao Copilot — Tarefa 4: CRUD de Ordens de Serviço (Backend) 24/11

# 1. Contexto

O projeto Oficina Moura possui um backend desenvolvido com Node.js, Express e MongoDB Atlas. O CRUD de veículos já está implementado e funcionando. O projeto utiliza Mongoose para modelagem e comunicação com o banco de dados.

Estou trabalhando na branch `feat/servicos-backend`. Consulte o arquivo `docs/PLANO.md` para seguir a estrutura e os requisitos definidos para a entidade de serviços.

# 2. Tarefa

Implementar o CRUD de ordens de serviço no backend, permitindo:

- Cadastrar novas ordens de serviço.
- Listar todas as ordens de serviço.
- Atualizar informações das ordens existentes.
- Excluir ordens de serviço.
- Consultar o histórico de serviços de um veículo específico.

# 3. Regras e Restrições

- Seguir os padrões já utilizados no arquivo `index.js`.
- Criar a modelagem da entidade de serviços utilizando Mongoose.
- Utilizar os seguintes campos:
  - `veiculo_id`: obrigatório, armazenado como texto (String), contendo o `_id` do veículo associado.
  - `descricao_problema`: obrigatório.
  - `status`: obrigatório, aceitando os valores `aberto`, `aguardando_peca` e `finalizado`.
  - `data_entrada`: obrigatório, armazenado como texto (String) no formato `AAAA-MM-DD`.
  - `servico_realizado`: opcional.
- Verificar se o veículo informado existe antes de cadastrar uma ordem de serviço.
- Permitir filtro opcional por status na rota de listagem.
- Na listagem, retornar também a placa e o modelo do veículo associado.
- Validar os dados recebidos e utilizar os seguintes códigos HTTP:
  - `200`: consulta, atualização ou exclusão realizada com sucesso.
  - `201`: ordem de serviço cadastrada com sucesso.
  - `400`: campo obrigatório ausente ou dado inválido. No cadastro, também deve ser retornado quando o veículo informado não existir.
  - `404`: ordem de serviço não encontrada ou veículo não encontrado na consulta de histórico.
  - `500`: erro interno inesperado no servidor.
- Manter as funcionalidades existentes de veículos sem alterações.
- Não implementar nesta etapa a regra de impedir a exclusão de veículos com ordens de serviço em aberto, pois ela será desenvolvida posteriormente.

# 4. Resultado Esperado

Implementar as seguintes rotas:

| Método | Rota | Finalidade |
|---|---|---|
| GET | `/servicos` | Listar todas as ordens de serviço, com filtro opcional por status |
| POST | `/servicos` | Cadastrar uma nova ordem de serviço |
| PUT | `/servicos/:id` | Atualizar uma ordem de serviço existente |
| DELETE | `/servicos/:id` | Excluir uma ordem de serviço |
| GET | `/veiculos/:id/servicos` | Consultar o histórico de serviços de um veículo |

A implementação deve seguir o `docs/PLANO.md`, manter a compatibilidade com o CRUD de veículos e tratar corretamente os erros e os códigos HTTP definidos.

Antes de finalizar, apresentar o diff completo para revisão. Não fazer commit e não alterar outros arquivos sem necessidade.

# Data: 24/11/2026 | Tarefa 5: Frontend de Ordens de Serviço

# Contexto
O projeto Oficina Moura possui frontend em React/Vite e backend publicado em https://oficina-servidor.onrender.com. O CRUD de ordens de serviço já estava implementado no backend.

# Tarefa
Implementar a interface de gerenciamento de ordens de serviço, permitindo cadastrar, listar, filtrar por status, atualizar o status e consultar o histórico de serviços de um veículo.

# Restrições
- Seguir a estrutura e os padrões existentes no frontend.
- Não alterar o backend.
- Não instalar bibliotecas desnecessárias.
- Utilizar os campos e rotas definidos pela API.
- Tratar erros retornados pelo backend.
- Não alterar arquivos fora do necessário.

# Pronto quando
- O cadastro e a listagem de ordens de serviço estiverem funcionando.
- O filtro por status funcionar.
- For possível atualizar o status e consultar o histórico.
- Os dados estiverem integrados à API.
- A validação impedir o envio de campos obrigatórios ausentes.
- Lint, build e revisão do diff forem concluídos.
- O código for revisado, aceito e publicado na branch main do GitHub.



# Data: 25/11/2026  Tarefa: Regra de exclusão de veículos


# Contexto
Estamos no repositório `oficina-servidor`, na branch `feat/regra-exclusao-veiculo`. O backend utiliza Node.js, Express e MongoDB. A rota `DELETE /veiculos/:id` já existe e realiza a exclusão de veículos.

# Tarefa
Implementar uma regra de negócio na rota `DELETE /veiculos/:id` para impedir a exclusão de um veículo que possua ordens de serviço em aberto.

# Regras e restrições
- A verificação deve acontecer no backend.
- Comparar o `_id` do veículo com o campo `veiculo_id` da ordem de serviço, que está armazenado como texto.
- Considerar os status `aberto` e `aguardando_peca` como ordens em aberto.
- Se houver uma ordem em aberto, retornar status HTTP 400 com uma mensagem clara.
- Não alterar outras rotas ou funcionalidades.
- Não realizar commit.

# Resultado esperado
- Veículo sem ordens de serviço: exclusão permitida.
- Veículo com ordem finalizada: exclusão permitida.
- Veículo com ordem `aguardando_peca`: exclusão impedida.
- Quando a exclusão for impedida, retornar status 400 e a mensagem: "Este veículo possui ordens de serviço em aberto e não pode ser excluído".