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