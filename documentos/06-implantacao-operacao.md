# Implantação e operação

## Situação atual

O repositório contém scripts para instalar, testar, compilar e executar as
aplicações localmente. Não há neste conjunto uma configuração aprovada de
hospedagem de produção, banco de dados, domínio, observabilidade ou backup.
Os comandos abaixo são para desenvolvimento e validação local, não uma
receita de produção.

## Pré-requisitos

- Node.js e npm instalados.
- Uma versão de Node.js compatível com as dependências do frontend e backend.
  Os manifests atuais não declaram uma versão mínima; fixe-a antes de preparar
  um ambiente de produção.
- Acesso à internet para instalação inicial das dependências.

## Instalação

Na raiz do repositório:

```sh
npm ci --prefix frontend
npm ci --prefix backend
```

## Execução local

Inicie o backend em um terminal:

```sh
npm --prefix backend run dev
```

Inicie o frontend em outro terminal:

```sh
npm --prefix frontend run dev
```

O backend usa a porta `3001` por padrão e escuta em `127.0.0.1`. O Vite pode
selecionar outra porta local se a padrão estiver ocupada. O proxy da interface
encaminha `/api` para `http://127.0.0.1:3001`.

Para executar o backend sem modo de desenvolvimento:

```sh
npm --prefix backend start
```

## Testes e build

```sh
npm --prefix backend test
npm --prefix frontend test
npm --prefix frontend run build
```

O build do frontend valida a compilação, mas não define por si só como a
aplicação será publicada.

## Configuração

- `PORT` altera a porta do backend.
- Se a porta do backend for alterada, o destino do proxy em
  `frontend/vite.config.ts` também precisa ser atualizado.
- Não há valores de credenciais necessários para iniciar a aplicação atual.
  Caso integrações futuras exijam segredos, eles devem ser configurados no
  ambiente de hospedagem, nunca commitados no repositório.

## Requisitos para uma implantação real

Antes de disponibilizar o sistema ao cliente, definir e validar:

1. Banco de dados, migração dos dados de exemplo e política de retenção.
2. Autenticação, autorização e isolamento de tarefas por usuário, se
   necessários.
3. Plataforma de hospedagem, domínio, HTTPS e proxy/reverse proxy. O backend
   atual está vinculado a `127.0.0.1` e precisa de configuração apropriada
   para receber tráfego externo.
4. Armazenamento de segredos e variáveis de ambiente.
5. Backups e procedimento de restauração.
6. Logs, monitoramento, alertas, atualização e resposta a incidentes.
7. Requisitos de privacidade, disponibilidade e desempenho acordados com o
   cliente.

Enquanto as tarefas forem mantidas somente em memória, o reinício do backend
restaura os dados de exemplo e descarta as tarefas criadas durante a execução.
