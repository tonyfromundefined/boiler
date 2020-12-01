import { Resolvers } from '~/types/codegen'

import { Query } from './Query/Query'

export const resolvers: Resolvers = {
  Query: {
    ...Query,
  },
}
