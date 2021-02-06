import { ApolloServer } from 'apollo-server-express'
import { STAGE } from '~/constants'

import { executor } from '@internal/apollo-jit-executor'

import { createContextFactory } from './context'
import { getSchema } from './schema'

export function createApolloServer() {
  const createContext = createContextFactory()

  return new ApolloServer({
    schema: getSchema(),
    playground: STAGE !== 'production',
    introspection: STAGE !== 'production',
    tracing: false,
    context: createContext,
    ...(STAGE !== 'development' ? { executor } : null),
  })
}
