# Validação, riscos e pendências

## Validações registradas

Na validação mais recente da implementação foram executados:

- Testes da API backend: aprovados.
- Testes do frontend: 2 arquivos e 11 testes aprovados.
- Verificação de tipos TypeScript (`npx tsc --noEmit`): aprovada.
- ESLint nos arquivos frontend alterados: aprovado.
- Verificação sintática dos arquivos backend alterados: aprovada.
- Build de produção do frontend: concluído com sucesso.
- Verificação no navegador: cadastro, edição, exclusão, alteração e desfazer
  status; em viewport de 390 px, sem rolagem horizontal.

O build apresentou avisos relacionados ao plugin `vite-tsconfig-paths` e a
`inlineDynamicImports` do Nitro, mas foi concluído com sucesso. Esses avisos
não equivalem a uma validação de publicação em uma plataforma de produção.

## Limitações e riscos conhecidos

| Tema | Estado atual | Consequência / ação necessária |
|---|---|---|
| Persistência | Dados mantidos em memória. | Reiniciar o backend perde alterações e restaura dados de exemplo; escolher banco e backup. |
| Identidade e acesso | Sem login ou autorização. | Não há separação de tarefas por pessoa; definir modelo de acesso antes de uso multiusuário. |
| Hospedagem | Apenas configuração local e build disponíveis. | Definir ambiente, domínio, HTTPS, proxy e estratégia de publicação. |
| Desfazer | Somente a alteração de status mais recente, por seis segundos. | Não é histórico e não desfaz criação, edição ou exclusão. |
| Escala e disponibilidade | Sem metas ou testes de carga registrados. | Definir limites e executar testes adequados ao ambiente acordado. |
| Segurança | Não foi realizada auditoria formal. | Fazer revisão de segurança e privacidade antes de produção. |
| Acessibilidade | Há rótulos e regiões de anúncio, mas sem auditoria formal. | Validar navegação por teclado, contraste e leitor de tela com critérios acordados. |

## Decisões recomendadas para a próxima etapa

1. Confirmar se o objetivo imediato é demonstração, piloto ou produção.
2. Definir se haverá contas e quais dados cada usuário pode acessar.
3. Escolher banco de dados, retenção, backup e restauração.
4. Escolher hospedagem, domínio, ambientes e responsáveis pela operação.
5. Acordar critérios mensuráveis de segurança, acessibilidade, desempenho e
   disponibilidade.
6. Repetir testes no ambiente de homologação e registrar aprovação do cliente.

## Critério de comunicação ao cliente

Apresentar a versão atual como MVP demonstrável com CRUD e estados de tarefa.
Não afirmar que há persistência durável, autenticação, backups ou implantação
em produção até que esses itens sejam implementados e validados.
