import { Article } from '~/models'

import { compactMap } from '@boiler/f'
import { connection } from '@boiler/graphql-connection-resolver'

import { Resolvers } from '../../__generated__/codegen'

export const ArticleQueries: Resolvers['Query'] = {
  articles: connection({
    cursorFromNode(node) {
      return node.createdAt.toISOString()
    },
    async nodes(parent, args) {
      const articles = await Article.find({
        ...compactMap(args.where ?? {}),
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
        .exec()

      return articles
    },
  }),
}
