# Aula-exemplo-IA-Renan

## Aplicações

O front-end da lista de estudos e sua API foram copiados para este repositório, mantendo os projetos de origem intactos:

```text
Aula-exemplo-IA-Renan/
├── frontend/      # React, TypeScript, Vite e TanStack Start
├── backend/       # API de tarefas em Node.js e Express
├── documentos/    # Documentação existente
├── prompts/       # Prompts existentes
├── backend.js     # Exemplo existente, preservado
└── frontend.html  # Exemplo existente, preservado
```

## Instalação

Na raiz deste repositório, instale as dependências de cada projeto:

```sh
npm ci --prefix frontend
npm ci --prefix backend
```

## Execução

Inicie cada aplicação em um terminal separado, a partir da raiz:

```sh
npm --prefix backend run dev
```

```sh
npm --prefix frontend run dev
```

O backend escuta na porta `3001` por padrão. O proxy de desenvolvimento do Vite encaminha as chamadas `/api` para essa porta. A porta pode ser alterada pela variável `PORT`; se fizer isso, ajuste também o destino do proxy em `frontend/vite.config.ts`.

A interface permite cadastrar tarefas com título, descrição e status (`pending`, `in-progress` ou `completed`). O quadro agrupa tarefas pelos três status, mostra a contagem em andamento e oferece edição, exclusão e alteração de status com opção para desfazer a última alteração. A API mantém os dados em memória e inclui o campo legado `completed` nas respostas para compatibilidade.

## Validação

```sh
npm --prefix backend test
npm --prefix frontend test
npm --prefix frontend run build
```

Os testes unitários do serviço do backend ficam em `backend/src/test/service.test.js`; os testes de API em `backend/src/test/backend.test.js` verificam a integração HTTP. No front-end, `frontend/src/test/tasks.test.ts` cobre as regras de tarefas e `frontend/src/test/task-row.test.tsx` cobre interações do componente.

O workflow do GitHub Actions executa os testes do backend e do front-end em cada push e pull request. Ele também faz o build do front-end para detectar erros de compilação.

As tarefas da API são armazenadas em memória e reiniciam quando o processo do backend é reiniciado.

## Documentação

A documentação para apresentação e discussão técnica está em [`documentos/`](./documentos/README.md):

- [Resumo da proposta](./documentos/01-resumo-proposta.md)
- [Escopo e requisitos](./documentos/02-escopo-requisitos.md)
- [Fluxo de uso e interface](./documentos/03-fluxo-interface.md)
- [Arquitetura da solução](./documentos/04-arquitetura.md)
- [Modelo de dados e API](./documentos/05-modelo-api.md)
- [Implantação e operação](./documentos/06-implantacao-operacao.md)
- [Validação, riscos e pendências](./documentos/07-validacao-pendencias.md)