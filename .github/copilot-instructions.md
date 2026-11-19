# Instruções permanentes do projeto Oficina Moura

## Objetivo e idioma

- Este projeto é o backend de **Oficina Moura**. O sistema ajuda o dono e os dois mecânicos a localizar veículos, acompanhar ordens de serviço, identificar carros aguardando peças e consultar o histórico de serviços.
- Toda a comunicação, documentação, nomes visíveis e mensagens direcionadas ao usuário devem usar **português brasileiro**.
- Use `docs/PLANO.md` como fonte principal de requisitos. Não altere o plano para resolver uma divergência sem uma solicitação explícita; registre mudanças futuras na seção 11 do plano.

## Tecnologias e padrões confirmados

- O projeto usa Node.js com módulos CommonJS.
- Tecnologias já declaradas em `package.json`: Express 5.3.0, CORS ^2.8.6, dotenv 18.0.10 e driver MongoDB 7.9.0.
- `index.js` é a entrada atual da aplicação, configurada em `package.json` como `main`.
- Siga o padrão atual: `require(...)` para imports, configuração de variáveis com `dotenv`, instância Express e registro dos middlewares antes das rotas.
- O servidor atual usa CORS e oferece a rota existente `GET /`, que devolve HTTP 200 com `{ "status": "ok", "message": "Backend está no ar" }`.
- Não conclua que MongoDB já está integrado apenas por constar em `package.json`: nenhuma conexão ou estrutura de persistência MongoDB está implementada em `index.js`.
- Não há suíte de testes implementada. O script `test` existente apenas informa que nenhum teste foi configurado. Não invente frameworks de teste sem uma necessidade explícita.

## Entidades e campos definidos no plano

### Veículos

- `placa`: texto, obrigatório conforme a entidade e a validação.
- `modelo`: texto, obrigatório conforme a entidade e a validação.
- `nome_dono`: texto, obrigatório conforme a entidade e a validação.
- `telefone_dono`: texto.
- **Divergência registrada:** na entidade, `telefone_dono` aparece como opcional (`Obrigatório?`: não); na seção de validações, ele aparece como obrigatório junto com `placa`, `modelo` e `nome_dono`. Não escolha nem normalize silenciosamente essa divergência. Não altere a validação relacionada a `telefone_dono` sem esclarecimento ou atualização explícita do plano.
- `placa` identifica um veículo de forma única.

### Serviços

- `veiculo_id`: texto, obrigatório; aponta para o veículo pelo seu id.
- `descricao_problema`: texto, obrigatório.
- `status`: texto, obrigatório; o plano cita exemplos como `aberto`, `aguardando_peca` e `finalizado`.
- `data_entrada`: texto no formato `AAAA-MM-DD`, obrigatório.
- `servico_realizado`: texto, opcional; detalhamento do que foi feito e preço.
- Uma ordem de serviço aponta para o veículo por `veiculo_id`.

Não adicione campos, tipos, entidades ou relacionamentos além dos descritos no plano. Qualquer nova necessidade deve ser confirmada antes da implementação.

## Rotas obrigatórias do plano

Implemente somente estes caminhos ao trabalhar no backend planejado:

- `GET /veiculos` — lista dos veículos; erro 500 se o servidor falhar.
- `POST /veiculos` — recebe `placa`, `modelo`, `nome_dono` e `telefone_dono`; devolve o veículo criado com id; erro 400 se faltar campo obrigatório.
- `PUT /veiculos/:id` — recebe `placa`, `modelo`, `nome_dono` e `telefone_dono`; devolve o veículo atualizado; erro 400 se faltar campo obrigatório e 404 se o veículo não existir.
- `DELETE /veiculos/:id` — recebe o id na URL e devolve mensagem de sucesso; erro 400 se o veículo possuir ordem de serviço em aberto e 404 se o veículo não existir.
- `GET /servicos` — lista ordens de serviço com placa e modelo; aceita opcionalmente `?status=aguardando_peca`; erro 500 se o servidor falhar.
- `POST /servicos` — recebe `veiculo_id`, `descricao_problema`, `status` e `data_entrada`; cria a ordem de serviço com id; erro 400 se faltar campo obrigatório ou se o veículo não existir.
- `PUT /servicos/:id` — recebe `status` e/ou `servico_realizado`; atualiza a ordem de serviço; erro 400 se o status for inválido e 404 se não existir.
- `DELETE /servicos/:id` — recebe o id na URL e devolve mensagem de sucesso; erro 404 se o serviço não existir.
- `GET /veiculos/:id/servicos` — recebe o id na URL e devolve o histórico de ordens de serviço do veículo; erro 404 se o veículo não existir.

A rota `GET /` já existente deve continuar funcionando, a menos que uma alteração explícita solicite o contrário.

## Regras de negócio e validações

- Não permitir excluir veículo que possua ordens de serviço em aberto, ou seja, cujo status seja diferente de `finalizado`.
- Não excluir um veículo ao receber somente um id sem os dados necessários; use o método e o caminho definidos acima.
- Para veículos, respeite a divergência explícita de `telefone_dono`: não adotar uma interpretação própria.
- Para serviços, `veiculo_id`, `descricao_problema`, `status` e `data_entrada` são obrigatórios; `servico_realizado` é opcional.
- Datas de entrada devem usar `AAAA-MM-DD`.
- Preserve os códigos HTTP e os cenários de erro descritos no plano.
- A entrega mínima não inclui cadastro detalhado de peças, estoque, cadastro separado de funcionários, controle financeiro avançado ou emissão de nota fiscal.

## Escopo de futuras alterações

- Preserve as funcionalidades obrigatórias previstas no plano:
  1. Cadastro de veículos: cadastrar, listar, editar e excluir.
  2. Cadastro de ordens de serviço ligadas ao veículo.
  3. Listagem de ordens de serviço mostrando placa e modelo.
  4. Filtro de ordens por status.
  5. Bloqueio de exclusão de veículo com ordem de serviço em aberto.
- Funcionalidades desejáveis só podem ser implementadas depois do mínimo e mediante solicitação explícita: recusar/avisar veículo duplicado pela placa e login simples.
- Fora do escopo: peças e estoque exatos e detalhados, cadastro separado de funcionários, controle financeiro avançado e emissão de nota fiscal.
- Não implemente telas ou endpoints em pedidos que não façam parte das fases previstas do plano.
- Não supere o escopo apenas porque uma biblioteca já foi declarada ou porque uma abordagem parece conveniente.

## Segurança e segredo

- O arquivo `.env` pode conter secrets e configurações sensíveis.
- **Nunca leia, reproduza, exponha, registre em logs ou inclua em respostas o conteúdo do `.env`**.
- Nunca altere o `.env` e não adicione valores de configuração reais a código, documentação ou commits.
- Use nomes de variáveis de ambiente existentes no projeto ou confirme novos nomes antes de usá-los. O código atual já usa `PORT` com fallback para `3000`.

## Antes de implementar

- Confirme que a alteração corresponde ao objetivo e às necessidades descritas no plano.
- Consulte primeiro `docs/PLANO.md`, `index.js` e `package.json`.
- Não invente campos, rotas, entidades, estados de status, respostas, tecnologias ou funcionalidades.
- Ao encontrar uma divergência ou requisito não definido, pergunte ou registre a questão em vez de assumir uma solução.
- Faça alterações cirúrgicas e preserve o comportamento existente confirmadamente implementado.
