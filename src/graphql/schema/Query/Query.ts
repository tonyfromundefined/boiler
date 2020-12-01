import { Resolvers } from '~/types/codegen'

export const Query: Resolvers['Query'] = {
  ping() {
    return true
  },
}
