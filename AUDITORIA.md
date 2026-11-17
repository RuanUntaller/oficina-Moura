Aluno:Ruan  Data: 11/06/2026

Copie este arquivo para docs/AUDITORIA.md no repositório oficina-servidor e preencha no Dia 9. No Módulo 14 a lista veio pronta. Aqui, a lista é sua: os quatro primeiros itens são obrigatórios, e você escreve pelo menos mais seis, pensando no que pode dar errado no SEU sistema. Um item só conta como conferido se a coluna "Como conferi" disser o que você fez e o que viu.

#	Item	Como conferi (o que fiz e o que vi)	Resultado
1	O arquivo .env nunca entrou no Git, em nenhum dos dois repositórios		
2	A regra de negócio foi testada com o caso que DEVE falhar, pelo site público		
3	Toda rota com :id responde 404 para um id que não existe		
4	Todo cadastro recusa (400) quando falta um campo obrigatório		
5			
6			
7			
8			
9			
10			
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