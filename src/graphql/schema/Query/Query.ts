import { Resolvers } from '~/types/codegen'

export const Query: Resolvers['Query'] = {
  version() {
    return process.env.COMMITHASH as string
  },
}
