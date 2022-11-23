# NG.Cash - Full Stack App

## Início rápido

- **Crie um arquivo .env**
> Observer em quais pastas existem um arquivo .env.example e crie um arquivo .env preenchendo-o com as variáveis definidas no arquivo .env.example

- **Criar os containers**

```shell

# yarn
$ yarn docker:build

# npm
$ npm run docker:build

```

- **Ativar / Desativar os conteiners**


```shell

# yarn
$ yarn docker:up / yarn docker:down

# npm
$ npm run docker:up / npm run docker down

```

- **Primeira ativação**
> Após a ativação bem sucedida, em um outro terminal/bash será necessário realizar as migrações para a criação das tabelas do banco de dados

```shell

# yarn
$ yarn docker:migrate

# npm
$ npm run docker:migrate

```


- **Testes**
> Utilize o comando a seguir para rodar os testes unitários e de integração da API

```shell

# yarn
$ yarn test

# npm
$ npm run test

```

- **Acessos**
> Com os conteiners ativados utilize as portas a seguir para acessar os serviços.
- 3000 : acesso ao frontend
  - No navegador: https://localhost:3000
- 3030 : acesso ao backend
  - Rotas para requisições:
    - https://localhost:3030/users - POST 
      - username: string
      - password: string 
    - https://localhost:3030/users - GET  
    - https://localhost:3030/login - POST
      - username: string
      - password: string 
    - https://localhost:3030/accounts - GET c/ Token
    - https://localhost:3030/transactions - POST c/ Token
      - receiver: string
      - value: number
    - https://localhost:3030/transactions - GET c/ Token
    - https://localhost:3030/transactions/cashins/ - GET c/ Token
    - https://localhost:3030/transactions/cashouts/ - GET c/ Token
    - https://localhost:3030/transactions/:data_em_string  - GET c/ Token
