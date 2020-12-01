import { Article, DocumentArticle } from '~/models'
import { Resolvers } from '~/types/codegen'

export const NodeQueries: Resolvers['Query'] = {
  async node(parent, args, ctx) {
    const [typename, ...ids] = args.id.split('#')
    const _id = ids.join('#')

    let result: DocumentArticle | null = null

    switch (typename) {
      case 'Article': {
        result = await ctx.loaders.mongo(Article).dataloader('_id').load(_id)
      }
    }

    return result
  },
}
