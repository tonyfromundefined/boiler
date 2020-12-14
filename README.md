# 🚀 Boiler

The Production-ready GraphQL boilerplate.

## Pre-configured

- Yarn 2
- TypeScript
- Webpack
- Babel
  - `@babel/preset-typescript`
  - `@babel/preset-env` (Node.js 14)
- GraphQL JIT Executor
- Sentry Apollo Plugin
- Winston Logger

## Pre-installed

### GraphQL

- Apollo Server
- GraphQL Tools
- GraphQL Code Generator

### Back-end

- MongoDB
- Mongoose
- Agenda.js

### Front-end

- Next.js
- React.js
- Relay

## Pre-written

- GraphQL Operation Executor
- GraphQL Connection Helper (`@boiler/graphql-connection-resolver`)

## Getting Started

```bash
# Run MongoDB instance by backgrond
$ docker-compose up -d

# Start development server
$ yarn dev
```

## Development

```bash
# Generate TypeScript typing from GraphQL schema declaration
$ yarn codegen

# Generate relay artifacts
$ yarn relay
```

## Build

```bash
# Build server
$ yarn build
```

## Deployment

Use docker. `Dockerfile` is already built-in

## Folder Structure and Architecture Principles

WIP

## To-do

WIP
