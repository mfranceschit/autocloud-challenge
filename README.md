# autocloud-challenge / Autocloud - Code Challenge

This project was bootstrapped with [TypeScript Express starter](https://www.npmjs.com/package/typescript-express-starter).

## Table of Contents

- [Install](#install)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
  - [npm run dev](#npm-run-dev)
  - [npm test](#npm-test)
  - [npm run lint](#npm-run-lint)
- [Config Variables](#config-variables)
- [API Docs](#api-docs)
- [Built With](#built-with)
- [Docker containers](#docker-containers)

## Install

First time you need to install:

Get project dependecies

```
yarn install or npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in production mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run dev`

Runs the app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Generates a build for production using TypeScript compiler.

### `npm test`

Executes the unit tests for the project using [Jest](https://jestjs.io).

### `npm lint`

Detect code styling issues using [ESLint](https://eslint.org). Also, includes the `npm run lint:fix` to fix detected issues.

## Config Variables

The configuration variable are available at the `src/configs` folder. There are different configuration for `development`, `production` and `test` environments. The variables are the following:

```
env=[environment_name]
secretKey=[secret_key]
dataSource=[data_source_url]
```

## API Docs

Once the project is up and running, the docs can be available at the [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Built With

- Typescript
- Jest
- ESlint
- Passport
- Express
- Swagger

See `package.json` for complete list of dependencies.

## Docker containers

To run the project using docker containers follow the steps below:

starts the containers in the background and leaves them running : docker-compose up -d
Stops containers and removes containers, networks, volumes, and images : docker-compose down
Modify docker-compose.yml and Dockerfile file to your source code.
