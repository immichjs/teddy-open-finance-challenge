# Teddy Open Finance Challenge

## Sobre o Projeto

Este projeto oferece uma solução simples e eficiente para encurtar URLs, permitindo que você compartilhe links de forma mais amigável

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Docker](https://www.docker.com/) (Obrigatório)
- [Node.js](https://nodejs.org/) (versão recomendada: v20.x)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/pt/) (recomendado)

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/immichjs/teddy-open-finance-challenge.git
   cd teddy-open-finance-challenge
   ```

2. Instale as dependências do projeto:

   ```bash
   pnpm install
   ## ou
   npm install
   ```

3. Verifique e modifique as variáveis de ambiente dos services no docker-compose em: ./docker/dev/docker-compose.yml

4. Crie um arquivo .env com as seguintes variáveis de ambiente.

   - As variáveis de ambiente que começão com POSTGRES são relacionada ao banco de dados portanto obrigatórias.
   - JWT_SECRET também é necessário que seja uma variável de ambiente pois é uma informação sensível que somente a API deve ter acesso a essa informação e de forma Hardcode.
   - PORT é opcional mas caso não exista a porta padrão será 3000. Não é obrigatório pois quando for realizado o deploy em cloud, inseriremos a porta em tempo de execução construção do deploy.
   - URL é obrigatória para o funcionamento do sistema. Pois é com base nessa informação que chegamos na maturidade 2 ao trazer \_links em requisições de encurtador e usuários.

   ```
   PORT=3000
   URL=http://localhost:3000/api
   POSTGRES_HOST=postgres
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB={DEFINA_O_NOME_DO_BANCO_AQUI}
   JWT_SECRET="{DEFINA_O_JWT_SECRET}"
   ```

5. Para subir os conteiner com docker-compose execute:

   ```bash
   pnpm docker:dev
    ## ou
    npm docker:dev
   ```

6. Após os dois containeres estarem disponíveis sem erros. Poderá acessar a documentação da api através da url: http://localhost:3000/api

7. Aproveite seu encurtador de link :)

## Melhorias

- Aplicaria arquitetura de microservices entre usuários, authenticação e encurtador. A maior dificuldade seria a construção do ambiente inicial e comunicação entre eles e conforme fosse crescendo em questão recursos, seriam criados novos serviços desacoplados e isolando possíveis bugs.

## Observações

A api já está em rodando cloud utilizando GCP com os serviços: Cloud Run e Cloud SQL: https://teddy-open-finance-api-m646j42wkq-ue.a.run.app/api
