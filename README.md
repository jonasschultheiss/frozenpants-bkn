<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">

## Description

The backend of a Instagram clone that [Jonathan Jost](https://github.com/T0nyDamage), [Marius Hummel](https://github.com/schmarss) and [I](https://github.com/jonasschultheiss) work/-ed on through 4 Modules.

The frontend part can be found [here](https://google.com).

## Installation

```bash
$ yarn install
```

## Documentation

A documentation can be generated locally by running either of the following commands.

```bash
# Build documentation
# available in docs/index.html
$ yarn doc:build

# Build and serve documentation
# available on localhost:8080
$ yarn doc:serve
```

## Setup

Duplicate `.env.example` and `ormconfig.example.json`. Rename them to `.env` and `ormconfig.json` respectively. Then enter the sensitive data.

**Make sure to not modify or delete the original files.**

Then run `$ yarn typeorm:run` to setup the database.

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Typeorm

```bash
# shortend command for typeorm cli
$ yarn typeorm

# create a new migration
$ yarn typeorm:migrate yourMigrationName

# migrate migration files to db
$ yarn typeorm:run

```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest and Frozenpants are both [MIT licensed](LICENSE).
