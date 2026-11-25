Aluno:Ruan  Data: 11/06/2026
                  25/11/2026

Copie este arquivo para docs/AUDITORIA.md no repositório oficina-servidor e preencha no Dia 9. No Módulo 14 a lista veio pronta. Aqui, a lista é sua: os quatro primeiros itens são obrigatórios, e você escreve pelo menos mais seis, pensando no que pode dar errado no SEU sistema. Um item só conta como conferido se a coluna "Como conferi" disser o que você fez e o que viu.

#	Item	Como conferi (o que fiz e o que vi)	Resultado
1	O arquivo .env nunca entrou no Git, em nenhum dos dois repositórios	
Como conferi: Conferi nos dois projetos se o arquivo .env aparecia no Git, e não apareceu.
Resultado: Passou✅


2	A regra de negócio foi testada com o caso que DEVE falhar, pelo site público		
Como conferi:  Tentei excluir um veículo que tinha uma ordem aguardando peça. Apareceu uma mensagem dizendo que não podia excluir, e o veículo continuou na lista.
Resultado: Passou✅

3	Toda rota com :id responde 404 para um id que não existe		
Como conferi: Usei fetch para testar as rotas de veículo, histórico e ordem de serviço usando IDs inexistentes. As rotas retornaram 404 quando o registro não foi encontrado.
Resultado: Passou✅

4	Todo cadastro recusa (400) quando falta um campo obrigatório		
Como conferi: Enviei os cadastros de veículo e ordem de serviço sem preencher os campos. Os dois retornaram 400. 
Resultado: Passou✅

5	Após cadastrar um veículo, ele aparece corretamente na lista?
Como conferi: Cadastrei um veículo de teste no site público e ele apareceu na lista de veículos. 
Resultado: Passou✅


6	Ao editar um veículo, as alterações ficam salvas?
Como conferi: Editei os dados de um veículo no site público e as alterações apareceram na lista.
Resultado: Passou✅

7	O sistema pede confirmação antes de excluir um veículo?
Como conferi: Tentei excluir um veículo no site público e apareceu uma confirmação antes da exclusão.
Resultado: Passou✅

8	O sistema pede confirmação antes de editar um veículo?
Como conferi: Editei um veículo pelo formulário do site público e salvei as alterações. Os dados atualizados apareceram na lista.
Resultado: Passou ✅

9	Após atualizar a página, a descrição da ordem de serviço continua salva?
Como conferi: Atualizei a página do site público e a descrição do problema da ordem de serviço continuou aparecendo.
Resultado: Passou✅

10	Ao excluir um veículo que só possui serviços finalizados, o que acontece com essas ordens na listagem?	
Como conferi: Cadastrei um veículo, criei uma ordem de serviço, marquei como finalizada e excluí o veículo, depois filtrei as ordens por “Finalizado” e a ordem não apareceu na listagem.
Resultado: Passou✅

Resultado: ✅ passou, ❌ falhou, 🔧 falhou e foi corrigido (diga em qual commit).

Se você fez o login (bônus)
#	Item	Como conferi	Resultado
L1	Senhas guardadas como hash		
L2	Segredo do token só em variável de ambiente		
L3	Token com validade		
L4	Todas as rotas de escrita recusam pedido sem token (401)		
L5	Teste do invasor: tentativa de excluir sem token, pelo endereço público		
L6	Usuário do professor criado e senha enviada em privado		
O que a revisão da IA disse
Peça ao Copilot, em modo Ask, que revise o projeto contra a sua lista. Anote onde ela concordou, onde discordou e quem estava certo.