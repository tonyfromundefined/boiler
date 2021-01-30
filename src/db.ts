import mongoose from 'mongoose'
import { MONGO_ENDPOINT, STAGE } from '~/constants'

import logger from '@internal/logger'

export async function createConnection() {
  switch (STAGE) {
    default: {
      break
    }
    case 'development':
    case 'alpha': {
      mongoose.set('debug', true)
      break
    }
  }

  const connection = await mongoose.connect(MONGO_ENDPOINT, {
    dbName: 'boiler',
    autoIndex: STAGE === 'development',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  logger.info('MongoDB is connected with mongoose')

  return connection
}
