import { GraphQLExecutor } from 'apollo-server-core'
import { CompiledQuery, compileQuery } from 'graphql-jit'

const cache: {
  [hash: string]: CompiledQuery['query']
} = {}

export const executor: GraphQLExecutor<Record<string, any>> = ({
  schema,
  document,
  context,
  request: { variables },
  queryHash,
}) => {
  if (!cache[queryHash]) {
    const { query } = compileQuery(schema, document) as CompiledQuery
    cache[queryHash] = query
  }

  return cache[queryHash]({}, context, variables)
}
