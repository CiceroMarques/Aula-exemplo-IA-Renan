# Escopo e requisitos

## Objetivo do MVP

Disponibilizar uma interface web para cadastrar e acompanhar tarefas de
estudo, com operações básicas de manutenção e três estados de andamento.

## Dentro do escopo atual

### Requisitos funcionais

- **RF-01 — Listar:** apresentar as tarefas existentes agrupadas por status.
- **RF-02 — Cadastrar:** aceitar título, descrição e status inicial.
- **RF-03 — Editar:** permitir atualizar o título e a descrição de uma tarefa.
- **RF-04 — Alterar status:** mover uma tarefa entre Pendente, Em andamento e
  Concluída.
- **RF-05 — Desfazer status:** disponibilizar uma ação para restaurar o status
  anterior à última alteração de status bem-sucedida, enquanto a notificação
  correspondente estiver visível.
- **RF-06 — Excluir:** permitir a remoção de uma tarefa após confirmação na
  interface.
- **RF-07 — Filtrar:** filtrar as tarefas por status ou exibir todas.
- **RF-08 — Contar:** informar a quantidade de tarefas em andamento.
- **RF-09 — Validar:** exigir título e descrição não vazios e rejeitar status
  não reconhecidos na API.
- **RF-10 — Comunicar estados:** informar carregamento, sucesso, erro e estado
  vazio na interface.

### Requisitos de interface

- Formulário de cadastro com título, descrição e seleção do status inicial.
- Quadro de três colunas em telas maiores e disposição adaptada a telas
  estreitas.
- Ações acessíveis para iniciar, concluir, reabrir, editar e excluir tarefas.
- Rótulos e mensagens em português.
- Estados de carregamento e notificações de sucesso ou erro.

## Fora do escopo atual

Os itens abaixo não estão implementados ou não foram especificados para este
MVP:

- Cadastro, login, perfis, permissões ou isolamento de dados por usuário.
- Banco de dados, armazenamento permanente, sincronização ou backups.
- Colaboração entre usuários.
- Notificações por e-mail, calendário ou integrações externas.
- Aplicativo móvel nativo.
- Requisitos quantitativos de disponibilidade, desempenho ou retenção.
- Plano de hospedagem e monitoramento de produção.

## Critérios de aceite propostos

1. Uma tarefa válida pode ser criada e aparece no estado selecionado.
2. O título e a descrição não podem ser enviados vazios.
3. O contador reflete a quantidade de tarefas com status Em andamento.
4. Alterar o status move a tarefa para a coluna correta e atualiza os
   contadores/filtros apresentados.
5. A ação **Desfazer** restaura o estado anterior à alteração de status mais
   recente, se acionada enquanto a notificação estiver visível.
6. O usuário pode editar e excluir uma tarefa; a exclusão pede confirmação.
7. Falhas da API são apresentadas ao usuário sem simular sucesso.
8. Em viewport móvel de 390 px, o conteúdo não exige rolagem horizontal da
   página.

## Decisões necessárias antes de produção

- A tarefa pertence a um usuário ou a um grupo? Como será autenticado?
- Qual banco de dados e política de backup serão usados?
- Por quanto tempo os dados devem ser mantidos?
- Qual ambiente de hospedagem e domínio serão utilizados?
- Há requisitos de disponibilidade, privacidade ou desempenho?
- O desfazer deve continuar disponível após navegação, expiração da
  notificação ou reinício do servidor? Hoje ele é uma ação temporária da
  interface para a última alteração de status.
