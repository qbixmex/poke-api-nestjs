<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="175" alt="Nest Logo" />
</div>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h1 align="center" style="font-size:4rem;">Pokedex</h1>

## Installation

### 1. Clone Repository

```bash
> git clone <repo-name>
```

### 2. Install Dependencies

```bash
> npm install
```

### 3. Load Docker Image

```bash
# Mongo Database Image
> docker-compose up -d
```

### 4. Seed Database

Execute this endpoint into Postman, RapidApi ... or any browser.

```
http://localhost:3000/api/v2/seed

Or

http://localhost:3000/api/v2/seed/alternative
```

### 5. Environment Variables

Copy __.env.template__ content into a new file __.env__ at root (note: outside src/ folder).

```
# example
MONGODB=mongodb://localhost:27017/nest-pokemon
PORT=3000
DEFAULT_LIMIT=10
```

## Running the app

```bash
# development
> yarn start

# watch mode
> yarn start:dev
```

## Build Application

```bash
# build for production
> yarn build

# production mode
> yarn start:prod
```

## Stack

* NesJs
* MongoDB