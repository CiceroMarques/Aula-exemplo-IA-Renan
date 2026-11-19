# MVP — LISTA DE TAREFAS DE ESTUDOS

Desenvolva exclusivamente o FRONT-END de uma aplicação web de lista de tarefas para estudantes.

Atue como um desenvolvedor front-end especialista em React, TypeScript e interfaces responsivas. Siga rigorosamente os requisitos abaixo, sem inventar funcionalidades ou ampliar o escopo.

## 1. OBJETIVO

Criar uma aplicação simples para estudantes registrarem suas atividades de estudo e acompanharem o progresso de cada tarefa.

**Usuário:** estudante que deseja organizar seus estudos e acompanhar suas atividades.

**Problema:** dificuldade em organizar tarefas de estudo e identificar quais atividades ainda precisam ser realizadas e quais já foram concluídas.

**Solução:** uma lista de tarefas com operações de cadastro, visualização, edição, exclusão e controle de conclusão.

O sistema deverá possuir apenas uma página principal, sem necessidade de login ou navegação entre telas.

## 2. PÁGINAS

### 2.1. Página principal — Minhas tarefas

A página deverá apresentar:

**Cabeçalho**
- Título: "Minhas tarefas".
- Subtítulo: "Organize seus estudos e acompanhe seu progresso."

**Cadastro de tarefas**
- Campo de texto para digitar uma nova tarefa.
- Placeholder: "Digite uma nova tarefa..."
- Botão "Adicionar".
- Permitir cadastro pelo botão ou pela tecla Enter.
- Impedir cadastro de campos vazios ou contendo somente espaços.

**Filtros**
Apresentar três opções:
- Todas: exibe todas as tarefas.
- Pendentes: exibe somente tarefas não concluídas.
- Concluídas: exibe somente tarefas concluídas.

**Listagem**

Cada tarefa deverá apresentar:
- Checkbox para marcar ou desmarcar a conclusão.
- Descrição da tarefa.
- Status textual: "Pendente" ou "Concluída".
- Botão de editar.
- Botão de excluir.

Não criar outras páginas ou telas.

## 3. COMPORTAMENTOS

### 3.1. Criar tarefa
1. O usuário digita uma tarefa.
2. Clica em Adicionar ou pressiona Enter.
3. O sistema valida o preenchimento.
4. Simula o processamento.
5. Adiciona a tarefa à lista.
6. Limpa o campo de entrada.
7. Exibe mensagem de sucesso.

### 3.2. Concluir tarefa
1. O usuário marca o checkbox.
2. O status muda para "Concluída".
3. O texto recebe o efeito line-through.
4. Ao desmarcar, o status volta para "Pendente" e o risco desaparece.

### 3.3. Editar tarefa
1. O usuário clica no ícone de lápis.
2. O texto passa para um campo editável.
3. Apresentar botões "Salvar" e "Cancelar".
4. Validar se a descrição não está vazia.
5. Salvar a alteração e apresentar mensagem de sucesso.
6. Ao cancelar, preservar a descrição original.

### 3.4. Excluir tarefa
1. O usuário clica no ícone de lixeira.
2. Apresentar confirmação: "Deseja realmente excluir esta tarefa?"
3. Disponibilizar opções "Cancelar" e "Excluir".
4. Ao confirmar, remover a tarefa.
5. Exibir mensagem de sucesso.

### 3.5. Filtrar tarefas
Os filtros deverão funcionar instantaneamente, sem recarregar a página.

- Todas: exibe todos os registros.
- Pendentes: exibe somente tarefas pendentes.
- Concluídas: exibe somente tarefas concluídas.

A filtragem não deverá alterar os dados originais.

## 4. ESTADOS DA INTERFACE

Implementar obrigatoriamente os seguintes estados:

### Estado vazio
Quando não houver tarefas cadastradas, apresentar:

**"Nenhuma tarefa cadastrada."**

"Você ainda não possui tarefas cadastradas para hoje. Adicione sua primeira tarefa e comece a organizar seus estudos!"

Quando um filtro não possuir resultados, apresentar mensagens específicas:
- "Nenhuma tarefa pendente."
- "Nenhuma tarefa concluída."

### Estado de carregamento
Durante inclusão, edição, exclusão e alteração de status:
- Exibir indicador de carregamento.
- Aplicar overlay sobre a interface.
- Desfocar discretamente o fundo.
- Bloquear interações duplicadas durante o processamento.
- Remover o overlay ao finalizar a operação.

O carregamento deverá ser simulado no front-end.

### Estado de erro
Apresentar notificações vermelhas no canto inferior direito.

Exemplos:
- "Informe uma descrição para a tarefa."
- "Não foi possível adicionar a tarefa."
- "Não foi possível atualizar a tarefa."
- "Não foi possível excluir a tarefa."

### Estado de sucesso
Apresentar notificações em verde-claro no canto inferior direito.

Exemplos:
- "Tarefa adicionada com sucesso!"
- "Tarefa atualizada com sucesso!"
- "Tarefa excluída com sucesso!"
- "Status atualizado com sucesso!"

As notificações deverão desaparecer automaticamente após alguns segundos.

## 5. RESPONSIVIDADE

A aplicação deverá funcionar em:
- Desktop.
- Notebook.
- Tablet.
- Smartphone.

Requisitos:
- Layout adaptável a diferentes resoluções.
- Conteúdo centralizado em telas maiores.
- Aproveitamento adequado da largura em dispositivos móveis.
- Campos e botões adaptáveis.
- Filtros organizados sem gerar rolagem horizontal desnecessária.
- Elementos da lista organizados em telas pequenas.
- Áreas de clique confortáveis.

Priorizar uma experiência simples e intuitiva em qualquer dispositivo.

## 6. ACESSIBILIDADE

Implementar boas práticas de acessibilidade:

- Utilizar HTML semântico.
- Associar labels aos campos.
- Permitir navegação por teclado.
- Apresentar indicadores visuais de foco.
- Garantir contraste adequado.
- Utilizar aria-label nos botões que apresentarem somente ícones.
- Não depender exclusivamente de cores para identificar status.
- Garantir acessibilidade dos checkboxes.
- Utilizar mensagens acessíveis para notificações.
- Manter hierarquia correta de títulos.

## 7. LIMITES DO ESCOPO

**IMPORTANTE: desenvolver somente o front-end.**

Tecnologias:
- React.
- TypeScript.
- CSS ou Tailwind CSS.

Utilizar componentes reutilizáveis e código organizado.

### Dados simulados

Criar dados fictícios para demonstrar o funcionamento da aplicação.

Exemplos:
- Estudar JavaScript.
- Revisar conceitos de React.
- Fazer exercícios de lógica de programação.
- Estudar HTML e CSS.

Todas as operações CRUD deverão funcionar utilizando estados locais em memória.

Identificar claramente os dados como simulados.

Os dados poderão ser reiniciados ao atualizar a página.

### Não implementar, em hipótese alguma:

- Autenticação.
- Login ou cadastro de usuários.
- Banco de dados.
- Supabase.
- Firebase.
- APIs externas.
- Back-end.
- Integrações externas.
- Calendário.
- Datas de vencimento.
- Categorias.
- Prioridades.
- Compartilhamento de tarefas.
- Funcionalidades adicionais não solicitadas.

Não criar telas extras.

Não implementar persistência de dados.

## 8. CRITÉRIOS DE ACEITAÇÃO VISUAL

O design deverá ser minimalista, moderno e profissional.

### Identidade visual
- Fundo branco ou cinza muito claro.
- Textos em tons de cinza escuro.
- Cores discretas.
- Verde-claro para sucesso.
- Vermelho para erros.
- Bordas suaves.
- Cantos levemente arredondados.
- Sombras discretas.
- Espaçamentos consistentes.

### Organização visual

Manter esta ordem na página:

1. Cabeçalho.
2. Campo de cadastro.
3. Filtros.
4. Lista de tarefas.

Cada tarefa deverá possuir organização visual clara, com descrição, status e ações.

Evitar excesso de elementos, animações chamativas, cores fortes e informações desnecessárias.

### Aprovação do MVP

O projeto deverá atender a todos os seguintes critérios:

1. Cadastrar tarefas.
2. Listar todas as tarefas.
3. Editar tarefas.
4. Excluir tarefas.
5. Marcar tarefas como concluídas.
6. Desmarcar tarefas concluídas.
7. Aplicar line-through nas tarefas concluídas.
8. Exibir corretamente os status.
9. Filtrar por todas, pendentes e concluídas.
10. Apresentar estado vazio.
11. Apresentar estado de carregamento.
12. Apresentar notificações de erro e sucesso.
13. Funcionar em desktop e dispositivos móveis.
14. Oferecer navegação acessível por teclado.

## INSTRUÇÃO FINAL

Desenvolva a aplicação seguindo exatamente esta especificação.

Não adicione funcionalidades por conta própria.

Não crie autenticação, banco de dados, serviços externos ou integrações.

Não transforme o MVP em um sistema complexo.

O objetivo é entregar uma aplicação front-end simples, funcional, responsiva e visualmente agradável, com todas as operações CRUD funcionando através de dados simulados.

Priorize fidelidade aos requisitos, simplicidade e qualidade visual.