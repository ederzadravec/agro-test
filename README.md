# Agro Test

## Frontend

Inicialmente, entrar na pasta `web` e instalar as dependencias:

`yarn install` ou `npm i`

Após a instalação, criar um arquivo `.env` com base no `.env.example`.

Feito isso, o frontend está pronto para ser executado, execute o comando:

`yarn dev` ou `npm run dev`

## Banco de dados

Na raiz do projeto, tem o arquivo `docker-compose.yml` para subir um docker com o banco de dados `Postgree`.

Para utilizar este banco, execute `docker-compose up -d` (na raiz do projeto)

Este banco de dados estará disponivel com os seguintes atributos:

```ts

  const port = 5432;
  const user = 'admin';
  const password = 'admin';
  const database = 'agro_eh_tech';
  
```

ps: Caso não tenha o docker-compose instalado, é necessário instalar ele.

## Backend

Inicialmente, entrar na pasta `api` e instalar as dependencias:

`yarn install` ou `npm i`

Após a instalação, criar um arquivo `.env` com base no `.env.example`. Alterar alguma variável caso necessário

Antes de rodar o projeto, é necessário fazer o setup do banco de dados. Para isso execute os seguintes comandos:

`node ace migration:run` - Criar as tabelas no banco de dados

`node ace db:seed` - Fazer a carga inicial com os dados necessários

Feito isso, o backend está pronto para ser executado, execute o comando:

`yarn dev` ou `npm run dev`


## Visualizando o sistema

Após todos os passos anteriores executados, agora o frontend deverá estar sendo executado em `https://localhost:5173` (caso não esteja, verifique no terminal onde esta executando qual o endereço)

Na tela de login, pode se usar o seguinte acesso:

```ts
  
  const usuário = 'admin';
  const senha = 'admin';

```

A tela inicial do sistema é o Dashboard. Passando o mouse sobre o menu lateral na esquerda, o menu se expandirá permitindo a navegação entre as telas.

## Stack

```ts

  const STACK = {
    FRONTEND: {
      framework: 'vite-react',
      components: 'by ederzadravec',
      hooks: 'by ederzadravec',
      validation: 'by ederzadravec',
      style: 'styled-components',
    },
    BACKEND: {
      framework: 'adonisjs',
      auth: 'bearer token, nativo do framework',
      orm: 'lucid, nativo do framework',
    },
    DATABASE: {
      service: 'postgrees',
    },
  }

```

## Considerações finais

O agro é tech, o agro é pop, o agro é tudo!
