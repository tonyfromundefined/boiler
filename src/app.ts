import Agendash from 'agendash'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { IncomingMessage, ServerResponse } from 'http'
import { parse, UrlWithParsedQuery } from 'url'

import { getAgenda } from './agenda'
import { createApolloServer } from './graphql'
import restapi from './restapi'

export async function createApp({
  render,
}: {
  render: (
    req: IncomingMessage,
    res: ServerResponse,
    parsedUrl?: UrlWithParsedQuery | undefined
  ) => Promise<void>
}) {
  const app = express()
  const apolloServer = createApolloServer()

  app.get('/health', (req, res) => res.send('ok'))

  app.use(cors())
  app.use(bodyParser.json())
  app.use(cookieParser())

  apolloServer.applyMiddleware({
    app,
  })

  app.use('/api', restapi)

  app.use('/agendash', Agendash(getAgenda()))
  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }))

  app.get('*', (req, res) => render(req, res, parse(req.url, true)))

  return app
}
