# Oficina Moura — Backend

O Oficina Moura é um sistema para ajudar o dono e os mecânicos da oficina a localizar veículos, acompanhar ordens de serviço e consultar o histórico dos atendimentos.

## O que este backend faz

Este servidor oferece APIs para:

- cadastrar, editar, listar e excluir veículos;
- cadastrar, editar, listar e excluir ordens de serviço;
- vincular cada ordem de serviço a um veículo;
- filtrar ordens de serviço pelo status;
- consultar o histórico de serviços de um veículo;
- impedir a exclusão de um veículo que tenha uma ordem aberta ou aguardando peça.

A entrada principal da aplicação é o arquivo `index.js`.

## Tecnologias utilizadas

- Node.js com módulos CommonJS;
- Express 5;
- MongoDB com Mongoose;
- driver MongoDB;
- dotenv para variáveis de ambiente;
- CORS.

## Links

- API pública: [https://oficina-servidor.onrender.com](https://oficina-servidor.onrender.com)
- Repositório: [https://github.com/RuanUntaller/oficina-Moura](https://github.com/RuanUntaller/oficina-Moura)

## Instalação e execução local

Pré-requisitos:

- Node.js instalado;
- uma conexão válida com o MongoDB.

No diretório do backend, instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com os nomes de variáveis descritos abaixo. Depois, execute:

```bash
node index.js
```

Por padrão, o servidor utiliza a porta `3000` quando `PORT` não está definida.

## Variáveis de ambiente

- `PORT`: porta local do servidor.
  - Exemplo fictício: `PORT=3000`
- `MONGODB_URI`: endereço de conexão com o banco MongoDB.
  - Exemplo fictício: `MONGODB_URI=mongodb://localhost:27017/oficina-moura`

Não coloque usuários, senhas, chaves ou strings de conexão reais em arquivos versionados. O arquivo `.env` está ignorado pelo Git.

## Fora do escopo

Neste momento, o projeto não inclui:

- login ou autenticação de usuários;
- cadastro separado de funcionários;
- controle de estoque e peças detalhado;
- controle financeiro avançado;
- emissão de nota fiscal.

