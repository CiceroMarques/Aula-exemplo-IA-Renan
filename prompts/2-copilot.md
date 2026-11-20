# PROMPT PARA GITHUB COPILOT — ESTRUTURAÇÃO DO PROJETO CRUD

Você é um desenvolvedor especialista em JavaScript e arquitetura de aplicações Node.js.

Preciso que você analise dois projetos existentes no meu computador e utilize o projeto BASE Backend como referência para organizar e estruturar o projeto principal.

## 1. Caminhos dos projetos

**Projeto principal — FrontEnd:**
`C:\Users\cicero62460606\Documents\lista-de-estudos`

**Projeto de referência — BASE Backend:**
`C:\Users\cicero62460606\Documents\AulaRenan CRUD Objeto\aula-exemplo-backend-jp-2026`

## 2. Objetivo

Analise detalhadamente o projeto BASE Backend antes de realizar qualquer alteração no projeto principal.

Quero que você identifique:
- Como o projeto está organizado.
- Quais tecnologias e bibliotecas são utilizadas.
- Como funciona a separação de responsabilidades.
- Como são implementados os arquivos de configuração.
- Como são estruturados os Controllers.
- Como são estruturados os Models.
- Como funcionam as Routes.
- Como são organizados os Services.
- Como funciona o arquivo principal de inicialização da aplicação.
- Qual padrão de nomenclatura é utilizado.

Depois dessa análise, utilize a mesma lógica de organização e arquitetura no projeto `lista-de-estudos`, adaptando-a às necessidades do projeto.

**IMPORTANTE:** Não quero que você copie cegamente os arquivos do projeto BASE. Quero que compreenda sua estrutura e aplique os mesmos padrões ao projeto principal.

## 3. Estrutura de pastas desejada

Organize o projeto principal utilizando a seguinte estrutura:

```text
lista-de-estudos/
│
├── src/
│   ├── config/
│   │   └── Arquivos de configuração
│   │
│   ├── controller/
│   │   └── Controllers responsáveis pelas requisições
│   │
│   ├── model/
│   │   └── Models responsáveis pela estrutura dos dados
│   │
│   ├── router/
│   │   └── Rotas da aplicação
│   │
│   └── service/
│       └── Regras de negócio da aplicação
│
├── index.js
├── package.json
└── README.md
```

A estrutura poderá conter arquivos adicionais caso sejam necessários, mas deverá respeitar obrigatoriamente a organização principal apresentada acima.

## 4. Tecnologias

Utilize JavaScript como tecnologia principal.

Considere as tecnologias e bibliotecas já utilizadas no projeto BASE Backend.

Regras:
- Priorize JavaScript.
- Respeite o padrão de implementação encontrado no projeto BASE.
- Não introduza TypeScript.
- Não adicione frameworks ou bibliotecas desnecessárias.
- Reaproveite dependências existentes quando fizer sentido.
- Mantenha compatibilidade com a versão do Node.js utilizada no projeto de referência.

## 5. Responsabilidade de cada camada

Organize o código respeitando as seguintes responsabilidades:

**Config**
- Centralizar configurações necessárias para o funcionamento da aplicação.
- Organizar configurações de ambiente e demais parâmetros.

**Controller**
- Receber e tratar as requisições.
- Validar os dados de entrada quando necessário.
- Acionar os Services.
- Retornar as respostas adequadas.

**Model**
- Representar a estrutura dos dados utilizados pela aplicação.
- Organizar os atributos e métodos relacionados aos objetos.

**Router**
- Centralizar as rotas da aplicação.
- Direcionar cada requisição para seu respectivo Controller.

**Service**
- Concentrar as regras de negócio.
- Executar operações e processamentos.
- Evitar que regras de negócio fiquem diretamente nos Controllers.

## 6. Arquivo index.js

Crie ou adapte o arquivo `index.js` para ser o ponto principal de inicialização da aplicação.

Ele deverá:
- Importar as configurações necessárias.
- Inicializar a aplicação.
- Registrar as rotas.
- Organizar a inicialização conforme o padrão encontrado no BASE Backend.

Evite concentrar regras de negócio dentro do index.js.

## 7. README.md

Crie um README.md completo, contendo:

1. Nome do projeto.
2. Descrição e objetivo.
3. Tecnologias utilizadas.
4. Pré-requisitos para execução.
5. Instalação das dependências.
6. Como executar o projeto.
7. Explicação da estrutura de pastas.
8. Responsabilidade de cada camada.
9. Funcionamento geral da aplicação.

Utilize uma linguagem clara e didática, considerando que o projeto também será utilizado para fins de aprendizado.

## 8. Cuidados durante a implementação

Antes de modificar qualquer arquivo:

1. Analise os dois diretórios.
2. Leia os arquivos relevantes do BASE Backend.
3. Analise o código existente no FrontEnd.
4. Identifique funcionalidades que precisam ser preservadas.
5. Defina como adaptar a arquitetura sem perder funcionalidades.

Durante a implementação:

- Não apague funcionalidades existentes.
- Não substitua códigos sem entender sua finalidade.
- Não crie arquivos duplicados desnecessariamente.
- Corrija os caminhos dos imports após reorganizar os arquivos.
- Garanta que os módulos estejam corretamente conectados.
- Preserve o funcionamento do projeto principal.
- Não altere o projeto BASE Backend: ele deve ser utilizado somente como referência.
- Não invente funcionalidades que não existem na especificação do projeto.

## 9. Validação final

Após concluir a implementação:

1. Verifique se todos os arquivos estão nos diretórios corretos.
2. Confira os imports e exports.
3. Verifique se o index.js inicializa corretamente.
4. Confira as dependências do package.json.
5. Execute os testes existentes, se houver.
6. Execute a aplicação para identificar possíveis erros.
7. Corrija problemas encontrados.

Não considere o trabalho concluído apenas porque os arquivos foram criados. Verifique se a estrutura está funcional.

## 10. Relatório de conclusão

Ao finalizar, apresente um resumo contendo:

- Como estava organizado o projeto BASE Backend.
- Quais padrões foram aproveitados.
- Quais arquivos foram criados.
- Quais arquivos foram modificados.
- Como ficou a nova estrutura de pastas.
- Quais funcionalidades foram preservadas.
- Quais testes foram executados.
- Se a aplicação está funcionando corretamente.
- Quais pendências ainda existem, caso haja alguma.

**ORIENTAÇÃO FINAL:**

Trabalhe diretamente nos arquivos existentes do projeto `lista-de-estudos`.

Utilize o projeto BASE Backend exclusivamente como referência arquitetural.

Quero uma implementação organizada, funcional, didática e coerente com o padrão de desenvolvimento utilizado nas aulas.

Não fique apenas sugerindo alterações: execute a análise, faça as modificações necessárias e valide o resultado.