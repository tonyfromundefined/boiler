import { ApolloServer } from 'apollo-server-express'
import { STAGE } from '~/constants'

import { executor } from '@boiler/apollo-jit-executor'

import { createContextFactory, MyContext } from './context'
import { getSchema } from './schema'

export function createApolloServer() {
  return new ApolloServer({
    schema: getSchema(),
    playground: STAGE !== 'production',
    introspection: STAGE !== 'production',
    tracing: false,
    // plugins: [ApolloSentryPlugin],
    context: createContextFactory(),
    executor,
  })
}
