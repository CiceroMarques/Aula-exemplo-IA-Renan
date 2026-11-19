Tenho uma especificação de MVP de lista de tarefas.
Transforme-a em um prompt para gerar somente o front-end no Lovable.
Inclua: usuário, problema, fluxo, componentes, estados de interface,
responsividade, acessibilidade e restrições do escopo.
NÃO adicione autenticação, serviços de banco ou integrações externas.
Use dados simulados claramente identificados.
Organize a resposta em: objetivo, páginas, comportamentos, limites
e critérios de aceitação visual.
Antes do prompt final, aponte lacunas ou contradições.


## Papel : 
    - Você atuará como uma analista de requisitos para o meu projeto, quero que você atue e pense como um durante o desenvolvimento do projeto.

## Contexto :
    - Será criado uma lista de tarefas para um estudante registrar seus estudos conforme ir avançando.


## Objetivo :
    Faça um MVP contendo as seguintes especificações.
    - É necessário desenvolver uma lista de tarefas onde o usuário incluirá as tarefas através de um input e clicar no botão adicionar.
    - Logo abaixo as tarefas devem ser mostradas e devem conter um checkbox para registrar quando uma tarefa for concluída, quando concluída, deve riscar a palavra.
    - enquanto uma tarefa não for concluída ela deve mostrar o status atual dela: pendente ou concluída.

## Escopo :
    Preciso de um CRUD para a lista de tarefas onde seja possível editar, criar novas tarefas, excluir e listar todas as tarefas.
    Os status, como mencionado antes, precisam mostar o atual status da tarefa, pendente, concluída
    e preciso de filtros simples para que seja possível listar todas as tarefas pendentes, por exemplo.


## Restrições : 
    Não será necessário nenhuma função extra nem tela de login para nada, mantenha o projeto o mais simples possível
    Não invente coisas, pergunte quando houver dúvida.

## Design : 
    -  O design do projeto precisa ser muito simples, sem cores chamativas, fundos claros e de forma que seja responsivo para vários dispositivos.
    - Seja acessível e intuitivo.

## Controle de Estados :
    - Estado Vazio: informar para adiocionar uma nova tarefa e dizer que ainda não há tarefas cadastradas para hoje.
    - Estado Carregando: Um sinal de carregamento enquanto está realizando as alterações, inclusões, deleções, etc. O fundo precisa ficar desfocado durante o processo.
    - Erro: Um alerta vermelho no canto inferior direito informando o motivo do erro, o que está faltando e qualquer que seja o motivo.
    - Sucesso: Informar que a tarefa foi adiocionada com sucesso em verde claro no canto inferior direito.