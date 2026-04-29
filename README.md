# fc-ddd-patterns

Implementacao do desafio de DDD com foco em Repository Pattern e testes automatizados.

## Requisitos

- Node.js LTS (recomendado: 18 ou 20)
- npm

## Instalacao

```bash
npm install
```

## Rodando os testes

```bash
npm test
```

O script de teste executa:

1. Validacao de tipos com TypeScript (`tsc --noEmit`)
2. Suite de testes com Jest

## Escopo implementado

- Implementacao completa de `OrderRepository`:
  - `create`
  - `update`
  - `find`
  - `findAll`
- Testes de infraestrutura para `OrderRepository` cobrindo:
  - criacao
  - atualizacao
  - busca por id
  - erro para entidade inexistente
  - listagem completa
