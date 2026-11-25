DIÁRIO — Oficina Mecânica
Aluno:  Sistema: Windows / Linux A cota do Copilot renova em: 30/11

Copie este arquivo para docs/DIARIO.md no repositório oficina-servidor. Preencha uma linha no fim de cada dia e faça commit. Leva 5 minutos. "% antes" e "% depois" vêm do painel do Copilot no VS Code. "Pedidos" é quantas mensagens você enviou ao Copilot no dia. O teto é 8 por dia.

Dia	Data	Tarefas concluídas (nº do PLANO)	% antes	% depois	Pedidos	O que a IA errou hoje e como eu percebi
1	17      Planejamento aprovado (PLANO.md)       0       0           0    (dia sem Copilot)
2   18      Continuação da primeira aula           -       -           2
3	18		Segunda aula		                   -       -           0
4	19		Continuação da segunda aula			   -      2.5	       2   A IA considerou informações desatualizadas sobre a estrutura do backend. Percebi o erro ao conferir o conteúdo do index.js pelo terminal e comparar com as orientações anteriores.
5	23	    (CRUD)	                              2.5	  4.1	       2   O Copilot implementou uma verificação de serviços em aberto na exclusão de veículos, embora a entidade de serviços ainda não tivesse sido implementada. Percebi ao revisar o código e comparar com o escopo da etapa.
6	24	   tarefa 3—CRUD de veículos no frontend 4.1     6.7           2   O Copilot adicionou regras CSS duplicadas no src/index.css, percebi ao revisar o diff e pedi a reorganização.
7	24     Frontend: Ordens de Serviço           6.7     14.4          3   Nenhum erro identificado
8	25     Validação das regras e Bloco 5       14.4	 14.8		   1   Nenhum erro identificado

Detalhes do Dia 8 — 25/11/2026
Implementei e validei a regra que impede excluir veículos com ordens de serviço não finalizadas.
Testei os 3 cenários no backend:
Veículo sem ordens: exclusão permitida.
Veículo com ordem finalizada: exclusão permitida.
Veículo com ordem aguardando peça: erro 400 e exclusão bloqueada.
No site público, em guia anônima, validei as funcionalidades do sistema e confirmei que a mensagem de bloqueio aparece corretamente e o veículo permanece cadastrado.
Decidi congelar o escopo no mínimo obrigatório, sem implementar o bônus de Login.


9						
10						
Total						
Balanço final (preencher no Dia 9)
Onde gastei mais tempo, e por quê?

Qual foi o erro mais sério da IA, e como eu o encontrei?

O que eu faria diferente se começasse hoje?

O que ficou fora, e o que eu faria em seguida?




