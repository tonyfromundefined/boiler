import { Resolvers } from '../../__generated__/codegen'

export const Query: Resolvers['Query'] = {
  version() {
    return process.env.COMMITHASH as string
  },
}
