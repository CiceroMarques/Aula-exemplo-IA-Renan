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

## Validação

```sh
npm --prefix backend test
npm --prefix frontend test
npm --prefix frontend run build
```

As tarefas da API são armazenadas em memória e reiniciam quando o processo do backend é reiniciado.