
## Description

- Backend Framework: NodeJS
- Language: TypeScript
- Server Framework: NestJS
- Database: PostgreSQL
- Testing Framework: JestJS
- API Documentation: Swagger


- Functions documentations:
```ts
/** Does something interesting
* 
* @param Place $where Where something interesting takes place
* @param integer $repeat How many times something interesting should happen
*
* @throws Some_Exception_Class If something interesting cannot happen
* @return Status
*/
```

### Context:

VISIT [TASK.md](./TASK.md) FOR MORE DETAILS

## Installation

```bash
$ npm install --legacy-peer-deps
```

### Database Setup
1. Make sure you are having mongodb installed on your machine or in cloud & running server.
2. Configure the mongodb connection string in `config/env/dev.env` file.

Make sure to configure all the environment variables in `config/env/dev.env` file.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
