import { ApolloError } from 'apollo-server-express'
import { Resolvers } from '~/types/codegen'

export const Node: Resolvers['Node'] = {
  __resolveType(parent) {
    return getTypeName(parent)
  },
  id(parent) {
    return getTypeName(parent) + '#' + parent.id
  },
}

export function getTypeName(parent: any) {
  if (parent?.constructor?.modelName) {
    return parent?.constructor?.modelName
  }
  throw new ApolloError('Cannot find type name from the model', '37670')
}
