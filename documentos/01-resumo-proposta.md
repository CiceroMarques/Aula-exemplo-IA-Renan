# Resumo da proposta

**Projeto:** Lista de tarefas para estudos  
**Público principal:** estudantes que desejam acompanhar suas atividades de
estudo  
**Situação:** MVP funcional para demonstração; requisitos de produção ainda
precisam ser definidos

## Contexto e problema

Estudantes precisam registrar o que pretendem estudar, consultar suas
atividades e reconhecer o que já iniciaram ou concluíram. Uma lista sem
organização por andamento pode dificultar a identificação da próxima tarefa e
do progresso atual.

## Solução proposta

Uma aplicação web simples permite cadastrar tarefas com título e descrição e
organizá-las em três estados:

- **Pendente** — ainda não iniciada.
- **Em andamento** — iniciada, mas não concluída.
- **Concluída** — finalizada.

O quadro agrupa as tarefas por estado, exibe filtros e contagem de atividades
em andamento e permite editar, excluir e alterar o estado de uma tarefa. Após
uma alteração de estado, a interface oferece a opção de desfazê-la.

## Benefícios esperados

- Visualizar as atividades de estudo por etapa.
- Identificar rapidamente tarefas em andamento.
- Registrar contexto em cada tarefa por meio de título e descrição.
- Corrigir uma alteração de estado feita por engano sem recriar a tarefa.

## Demonstração de uso

1. O estudante informa o título, a descrição e o estado inicial de uma tarefa.
2. A tarefa aparece na coluna correspondente.
3. Ao começar a atividade, o estudante a move para **Em andamento**.
4. Ao terminar, move a tarefa para **Concluída**.
5. Se a mudança de estado foi acidental, pode usar **Desfazer** enquanto a
   notificação de sucesso estiver visível.

## Limites atuais da proposta

Este MVP não oferece contas de usuário, sincronização entre pessoas ou
persistência durável. A API guarda as tarefas em memória e é reiniciada com
dados de exemplo quando o processo do backend reinicia. Portanto, a versão
atual é adequada para demonstração e validação de fluxo, mas não deve ser
apresentada como solução de produção com armazenamento garantido.

Antes de contratar ou iniciar uma implantação real, é necessário decidir onde
os dados serão persistidos, quem poderá acessá-los e como a aplicação será
hospedada e operada.
