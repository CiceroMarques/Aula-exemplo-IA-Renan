# Modelo de dados e API

## Entidade `Task`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | string | Sim, gerado pela API | Identificador da tarefa. |
| `title` | string | Sim | Título não vazio. |
| `description` | string | Sim | Descrição não vazia. |
| `status` | string | Sim | `pending`, `in-progress` ou `completed`. |
| `completed` | boolean | Resposta | Campo derivado de `status`; mantido para compatibilidade legada. |

Tarefas iniciais de demonstração usam identificadores simples. Novas tarefas
recebem identificadores UUID. O campo `completed` é `true` somente quando
`status` é `completed`.

## Base e formato

- Base local: `http://127.0.0.1:3001/api/tarefas`.
- Requisições com corpo: JSON (`Content-Type: application/json`).
- O prefixo configurável da porta do backend é `PORT`; o proxy atual do Vite
  aponta para a porta `3001` e precisa ser atualizado se a porta mudar.

## Endpoints

| Método e caminho | Finalidade | Sucesso |
|---|---|---|
| `GET /api/tarefas` | Lista todas as tarefas. | `200` e array JSON. |
| `GET /api/tarefas/:id` | Busca uma tarefa por identificador. | `200` e objeto JSON. |
| `POST /api/tarefas` | Cria uma tarefa. | `201` e tarefa criada. |
| `PATCH /api/tarefas/:id` | Atualiza parcialmente título, descrição ou status. | `200` e tarefa atualizada. |
| `DELETE /api/tarefas/:id` | Exclui uma tarefa. | `204`, sem corpo. |

### Exemplo de criação

```http
POST /api/tarefas
Content-Type: application/json
```

```json
{
  "title": "Revisar álgebra",
  "description": "Resolver os exercícios da unidade 2.",
  "status": "in-progress"
}
```

Exemplo de resposta:

```json
{
  "id": "identificador-gerado",
  "title": "Revisar álgebra",
  "description": "Resolver os exercícios da unidade 2.",
  "status": "in-progress",
  "completed": false
}
```

### Exemplo de alteração

```http
PATCH /api/tarefas/identificador-gerado
Content-Type: application/json
```

```json
{
  "status": "completed"
}
```

O desfazer da interface é outra requisição `PATCH` com o status anterior; não
existe endpoint de histórico ou desfazer no backend.

## Validação e erros

- Título e descrição precisam ser strings não vazias.
- Status aceitos: `pending`, `in-progress` e `completed`.
- Campos desconhecidos e objetos JSON inválidos são rejeitados.
- `PATCH` exige ao menos um campo permitido.
- Campo ou status inválido: `400` e objeto `{ "error": "..." }`.
- Identificador inexistente: `404` e objeto `{ "error": "..." }`.
- Rota inexistente: `404`.
- Erro inesperado: `500` com mensagem genérica; detalhes são registrados no
  log do servidor.

## Compatibilidade legada

O campo booleano `completed` é aceito em entradas antigas e derivado nas
respostas. Em atualizações legadas, `true` mapeia para `completed` e `false`
para `pending`. Se uma requisição enviar `status` e `completed` ao mesmo
tempo, os valores precisam ser coerentes; caso contrário, a API retorna `400`.
Na criação antiga sem `title`, a descrição é usada como título.
