import { Resolvers } from '~/types/codegen'

import { Article, ArticleQueries } from './Article'
import { Node, NodeQueries } from './Node'
import { Query } from './Query/Query'

export const resolvers: Resolvers = {
  Query: {
    ...Query,
    ...ArticleQueries,
    ...NodeQueries,
  },
  Node,
  Article,
}
