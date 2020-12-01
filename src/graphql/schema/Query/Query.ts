import { Resolvers } from '../../__generated__/codegen'

export const Query: Resolvers['Query'] = {
  ping() {
    return true
  },
  version() {
    return process.env.COMMITHASH as string
  },
}
