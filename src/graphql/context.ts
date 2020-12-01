import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

export interface MyContext {}

export function createContextFactory(): ContextFunction<
  ExpressContext,
  MyContext
> {
  return ({ req }) => ({})
}
