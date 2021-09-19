## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript Notifications project

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation
[wiki](https://github.com/GuillaumeGSO/notifications-project/wiki/Architecture)

## How to start a local Mango DB hosted in a Docker container (not tested)
Based on : [MongoDB](https://hub.docker.com/_/mongo)

Download and install Docker

Download offcial docker image :
```bash docker pull mongo``` 


Start the container : ```bash $ docker run --name some-mongo -d mongo:tag```

With : some-mongo = name of your instance, tag = version on mongoDB
