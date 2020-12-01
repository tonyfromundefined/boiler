import {
  GraphQLDate as Date,
  GraphQLDateTime as DateTime,
  GraphQLTime as Time,
} from 'graphql-iso-date'

import { Resolvers } from '../__generated__/codegen'
import { Article, ArticleQueries } from './Article'
import { Node, NodeQueries } from './Node'
import { Query } from './Query/Query'

const scalars: Resolvers = {
  Date,
  DateTime,
  Time,
}

export const resolvers: Resolvers = {
  Query: {
    ...Query,
    ...ArticleQueries,
    ...NodeQueries,
  },
  Node,
  Article,
  ...scalars,
}
