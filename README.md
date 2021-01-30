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
- Node Hot Loader

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
- GraphQL Connection Helper (`@internal/graphql-connection-resolver`)

## Getting Started

```bash
# Run MongoDB instance by backgrond
$ docker-compose up -d

# Install dependencies
$ yarn

# Copy .env.example to .env
$ cp .env.example .env

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

Use docker. `Dockerfile` is already built-in.

## Folder Structure and Architecture Principles

### 1. `/graphql`

Contains the content corresponding to the GraphQL API layer.

- Schema declarations and the resolvers
- Apollo server Options

### 1-a. `/graphql/schema/[model]`

Write the schema declaration and resolver implementation

#### ⭐️ Principle 1. Separate code locations by domain (Seperation of concern)

Schema declarations and resolvers are organized by domain (object model) and included in the domain name folder.

#### ⭐️ Principle 2. Separate the API layer and the persistent layer

The domain of the GraphQL layer and the persistent layer (usually it means a table/collection of a database) should be separated by location.

> Database tables/collections are written in `/src/models` and mapped in `/codegen.yml` before use.

#### ⭐️ Principle 3. Include Description in all GraphQL schema declarations

The behavior of the code can be fully understood through the context around it, but the API layer at the end of the code or the persistent layer at the inner end of the code must be commented for full understanding.

### 1-b. `/graphql/schema/resolvers.ts`

Collect resolvers exported from each domain folder

#### ⭐️ Principle 4. Minimize automation

Anything related to the principle of operation is never automated. In order to collaborate with colleagues, all code actions must be written by hand.

### 1-c. `/graphql/context.ts`

Write the context type declaration and context generator

### 1-d. `/graphql/server.ts`

Create an Apollo Server. You can modify the options of Apollo Server. The GraphQL JIT Executor is integrated here.

### 2. `/lib`

Create an internal library to be used inside the application

#### ⭐️ Principle 5. Extract the technical part of the logic.

Simple separation is not the `refactoring`. Separate the technical parts of your logic, create an internal library, and keep the code so that only the business logic remains in the application logic.

#### ⭐️ Principle 6. Design the internal library like an NPM package.

The internal library should not import code from a folder other than `/lib`. Be sure to design so that the necessary dependencies can be injected externally in any way you want. (this is called dependency injection)

> For this, I have set up aliases in webpack and typescript. You can use the internal library like this:

```typescript
import * as F from '@internal/f'
```

### 3. `/constants`

Contains environment variables injected into the server, or constants computed through environment variables.

#### ⭐️ Principle 7. Constants must be commented

As with the `Principle 3`, specific comments are required to accurately understand the environment variables that exist at the end of the server.

### 4. `/models`

Contains content related to the persistent layer. (Here I mean MongoDB and Mongoose declarations)

> Soft delete and timestamp plugins have been set up for immediate use in production. Delete it if you don't need it.

#### ⭐️ Principle 8. Models must be commented

As with the `Principle 3`, specific comments are required to accurately understand the models.

### 5. `/restapi`

Here are the basic REST API settings for API interworking with the other internal service.

#### ⭐️ Principle 9. Application logic is handled only at the GraphQL layer.

REST API is difficult to separate code by domain. (That's also the main reason to use GraphQL) So, with the `executeOperation` function (in `/src/graphql/executeOperation`), the REST API is only used to alias the API.

### 6. `/agenda`

Write asynchronous worker logic for cron and other tasks here. See Agenda.js.

> Processing large amounts of data (JSON.parse) can be a blocking factor in the Node.js server. Therefore, if there is a large amount of data processing inside the execution of asynchronous logic, server performance may be affected. At this time, it is recommended to separate the worker instance from the server instance using environment variables. (However, most startups do not process **large** amounts of data, so it is recommended to start small with one instance like this boilerplate.)

### 7. `/client`

Contains the Next.js client implementation.

#### ⭐️ Principle 10. Follows relay

Follow the pattern that Relay enforces. Not only does it increase the reuse of React components, it helps design good schemas, and actually brings good performance.

## How to keep the server performant?

- GraphQL query parsing is blocking operation in Node.js. Cache the parsed results or just use the JIT Executor. (Included in this boilerplate.)
- Relay clients increase the size of a single query. Use Persisted Queries to reduce network costs. (I didn't include it in this boilerplate, as it requires implementation in the persistent layer.)
- I recommend using Apollo Studio and Datadog Trace.

> Keep 50~100ms based on p99

## To-do

WIP
