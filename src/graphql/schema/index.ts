import { GraphQLSchema } from 'graphql'

import logger from '@boiler/logger'
import { makeExecutableSchema } from '@graphql-tools/schema'

import typeDefs from '../__generated__/typeDefs'
import { resolvers } from './resolvers'

let schema: GraphQLSchema | null = null

export function getSchema() {
  if (schema) {
    return schema
  }

  schema = makeExecutableSchema({
    typeDefs,
    resolvers: resolvers as any,
    inheritResolversFromInterfaces: true,
    logger: {
      log(e) {
        return logger.error(e.message)
      },
    },
  })

  return schema
}
