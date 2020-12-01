import { Article } from '~/models'
import { Resolvers } from '~/types/codegen'

import { connection } from '@boiler/graphql-connection-resolver'

export const ArticleQueries: Resolvers['Query'] = {
  articles: connection({
    cursorFromNode(node) {
      return node.createdAt.toISOString()
    },
    async nodes(parent, args) {
      const articles = await Article.find({
        ...args.where,
        ...(args.after
          ? {
              createdAt: {
                $lt: new Date(args.after),
              },
            }
          : null),
      })
        .sort({
          createdAt: -1,
        })
        .limit(args.first + 1)

      return articles
    },
  }),
}
