import R from 'ramda'
import { Article, DocumentArticle } from '~/models'

import { Resolvers } from '../../__generated__/codegen'

export const NodeQueries: Resolvers['Query'] = {
  async node(parent, args, ctx) {
    const getNode = R.pipe(
      (id: string) => {
        const [typename, ...ids] = id.split('#')
        const _id = ids.join('#')

        return {
          typename,
          _id,
        }
      },
      ({ typename, _id }): Promise<DocumentArticle | null> => {
        switch (typename) {
          case 'Article':
            return ctx.loaders.mongo(Article).dataloader('_id').load(_id)
          default:
            return Promise.resolve(null)
        }
      }
    )

    return getNode(args.id)
  },
}
