import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { MongooseDataloaderFactory } from 'graphql-dataloader-mongoose'

export interface MyContext {
  loaders: {
    mongo: MongooseDataloaderFactory['mongooseLoader']
  }
}

export function createContextFactory(): ContextFunction<
  ExpressContext,
  MyContext
> {
  return ({ req }) => {
    const mongoLoaderFactory = new MongooseDataloaderFactory()
    const mongoLoader = mongoLoaderFactory.mongooseLoader.bind(
      mongoLoaderFactory
    )

    return {
      loaders: {
        mongo: mongoLoader,
      },
    }
  }
}
