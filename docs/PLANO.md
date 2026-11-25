PLANO — Oficina Moura
Aluno: Ruan Início: 11/06/2026

Copie este arquivo para docs/PLANO.md no repositório oficina-servidor e preencha no Dia 1. Este é o único documento do projeto que você escreve sem o Copilot. O plano é vivo: quando algo mudar, atualize e registre na seção 11.

1. O problema, com minhas palavras
Quem é o cliente: Raimundo (dono) e os 2 mecanicos da oficina.

O que incomoda hoje: 
1-Dificuldade para saber se o carro esta pronto.
2-Esquecimento dos carros que aguardam peças.
3-Não sabe qual serviço foi realizado
4-Anotações duplicadas do mesmo carro
5-Perdeu as informações pois o caderno está molhado.

Como ele vai saber que o sistema resolveu. De 5 a 8 linhas:
1-Quando pesquisar o veículo e encontrar.
2-lista de carros que aguardam as peças.
3-pedido informando se foi realizado
4-Sistema não deixa criar pedidos que já existem, sendo assim ele envia uma mensagem, informando que o pedido já existe.
5-Armazenar as informações em um banc de dados, para que assim não perca os dados.


2. Perguntas ao cliente (até 5) e respostas
#	Pergunta	                Resposta do cliente
1   Qual o nome da sua oficina? Oficina Moura
2	Você gostaria de deixar peças e valores exatos?
3	Você quer um cadastro separado para seus funcionários?
4		
5		
3. Suposições
O que o briefing não disse, eu não perguntei e decidi por conta própria. Uma linha por suposição.
Perguntei e dcidi que não terá.
1-Não haverá cadastro separado de funcionários ou clientes (dados do dono ficam no cadastro do veículo).
2-Não haverá controle de estoque de peças; o valor e os serviços serão campos simples na Ordem de Serviço.

4. Necessidades
No formato: "[quem] precisa [fazer o quê] para [resolver qual problema]".
1-Como dono ou mecânico, preciso alterar o status do serviço de cada veículo para saber rapidamente se o carro está pronto.
2-Como dono, preciso ir para lista dos veiculos e filtrar para ver os veículos que aguardam as peças.
3-Como dono, preciso consultar o histórico de veículos para saber o que já foi feito no carro, assim saberei qual serviço foi realizado.
4-Como dono, preciso que o sistema me avise e não deixe que eu saia criando pedidos iguais, para que assim não haja confusão.
5-Como dono, preciso que o sistema salve as informações em um banco de dados e/ou nuvem. Para não correr o risco de perder os dados.

5. Entidades e campos

Entidade 1: Veículos 
Campo	      Tipo	Obrigatório?	Observação
placa         texto   sim           Identificar um único carro
modelo        texto   sim           modelo/nome do veículo
nome_dono     texto   sim           dono do veículo
telefone_dono texto   sim           Telefone do dono do veículo

Entidade 2: Serviços

Campo	             Tipo	       Obrigatório?	   Observação
veiculo_id           texto         sim             identificar o veículo pelo id
descricao_problema   texto         sim             Descrever o problema do veículo
status               texto         sim             O estado atual do serviço, como "aberto", "aguardando_peca" ou "finalizado"
data_entrada         texto         sim             Informar o dia que o veículo chegou usar formato AAAA-MM-DD
servico_realizado    texto         nao             Detalhamento do que foi feito e preço

Relacionamento: qual entidade aponta para qual, e por qual campo.
serviço aponta para o Veículo através do veiculo_id.

Formato das datas: AAAA-MM-DD

6. Funcionalidades em três colunas
Obrigatório (mínimo da rubrica)		
* Cadastro de veículos (cadastrar, listar, editar, excluir).
* Cadastro de ordens de serviço ligado ao veículo.
* Listagem de ordens de serviço mostrando a placa e o modelo do veículo.
* Filtro na listagem de serviços por status (ex: "aguardando peça").
* Regra de negócio no backend: não permitir excluir veículo com ordem de serviço em aberto.

Desejável (só depois do mínimo)
* Recusar/avisar cadastro duplicado de veículos pela placa.
* Sistema de login simples.


Fora do escopo (decidi não fazer)
* Cadastro exato e detalhado de peças e estoque.
* Cadastro separado / individual de funcionários.
* Controle financeiro avançado e emissão de nota fiscal.



7. Telas
-Página: veiculos
-O que mostra: O rmulário para cadastrar veículos e a tabela com todos os veículos já castrados.
-O que o uário pode fazer nela: Cadastrar novos veículos, editar dados de um veículo, excluir um veículo e clicar no botão/link para ver o histórico de serviços daquele carro.

-Página: serviços   
-O que mostra: A listagem das Ordens de Serviço (mostrando a placa e o modelo do veículo, o problema e o status atual).
-O que o usuário pode fazer nela: 1. Abrir uma nova Ordem de Serviço, e iltrar a lista por statu e (ex: ver só os carros "aguardando peça") e atualizar o status do serviço (ex: mudar de "aberto" para "finalizado").



8. Rotas do backend
Verbo    Caminho                  O que recebe                          O que devolve                                             Quando dá erro
GET      /veiculos                nada                                  lista dos veículos                                        500 se o 
servidor falhar

DELETE   /veiculos/:id            Id do veículo na URL                  mensagem de sucesso                                       Erro 400 se o veículo possuir serviço em aberto ou 404

POST     /veiculos                placa,modelo,nome_dono,telefone_dono  veículo com id                                            400 se faltar algum campo obrigatório

PUT      /veiculos/:id            placa,modelo,nome_dono,telefone_dono  veículo atualizado                                        Erro: 400 se faltar campo obrigatório ou 404 se o veículo não existir.

GET      /servicos                nada (ou ?status=aguardando_peca)     Lista de ordens de serviço (com placa e modelo)           500 se o servidor falhar

POST     /servicos                veiculo_id,descricao_problema,status,data_entrada  Ordem de serviço criada com id            400 se faltar campo obrigatório ou veículo não existir

PUT      /servicos/:id            status (e/ou servico_realizado)       Ordem de serviço atualizada                               400 se status for inválido ou 404 se não existir

DELETE   /servicos/:id            Id do serviço na URL                  mensagem de sucesso                                       404 se o serviço não existir

GET      /veiculos/:id/servicos   Id do veículo na URL                  Lista de ordens de serviço do veículo (histórico)         404 se o veículo não existir



9. Regras
Regra de negócio:
Não é possível excluir um veículo que possua ordens de serviço em aberto (status diferente de "finalizado")

Validações:
- Veículos: os campos `placa`, `modelo`, `nome_dono` e `telefone_dono` são todos obrigatórios.
- Serviços: os campos `veiculo_id`, `descricao_problema`, `status` e `data_entrada` (formato AAAA-MM-DD) são obrigatórios. O campo `servico_realizado` é opcional.


10. Tarefas
Cada tarefa cabe em uma branch e em um pedido principal ao Copilot.
Status possíveis: pendente, em andamento, concluída, cortada.

# Tarefa	                                                         Projeto              Branch                     Dia previsto   Status

Criar esqueleto do projeto e realizar deploy inicial no servidor     oficina-servidor/web  setup/deploy-inicial        Dia 2      concluído
Backend: Criar rotas CRUD de Veículos                                oficina-servidor      feature/cadastro-veiculos-backend    Dia2 concluído
Frontend: Criar tela e integração CRUD de Veículos                   oficina-web           feat/veiculos-frontend      Dia 3      concluído
Backend: Criar rotas CRUD de Serviços                                oficina-servidor      feat/servicos-backend       Dia 4      concluído
Backend: Impedir exclusão de veículo com ordem de serviço em aberto  oficina-servidor      feat/regra-exclusao-veiculo Dia 4      concluído
Frontend: Criar tela de Serviços com filtro de status e histórico    oficina-web           feat/servicos-frontend      Dia 5      concluído
Testes integrados, validação de regras e ajustes finos no layout     oficina-servidor/web  fix/ajustes-finais          Dia 6      pendente
Auditoria final do plano, diário e revisão para a entrega            docs                  main                        Dia 7      pendente

11. Mudanças no plano
Data	O que mudou	Por quê
24/11/2026  Frontend: CRUD de veículos concluído e publicado. A implementação, os testes e a validação no site público foram finalizados.
24/11/2026  Tarefa 4 dividida em duas etapas: CRUD de serviços concluído e regra de exclusão de veículo pendente. | Separar as entregas conforme orientação.
24/11/2026  Frontend de Serviços concluído e publicado no GitHub. Implementação testada, aceita pelo tutor e publicada na main.