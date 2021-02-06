import 'source-map-support/register'
import 'dotenv/config'

import logger from '@internal/logger'

import { startAgenda, stopAgenda } from './agenda'
import { createApp } from './app'
import { createClient } from './client'
import { STAGE } from './constants'
import { createConnection } from './db'

declare const module: any

const PORT = 3000

;(async () => {
  logger.info(`Stage "${STAGE}" is initializing...`)

  const [{ render }] = await Promise.all([
    createClient(),
    createConnection().then(() => startAgenda()),
  ])

  let _currentApp = await createApp({ render })
  let _stopCurrentAgenda = stopAgenda

  const httpServer = _currentApp.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`)
  })

  if (module.hot) {
    module.hot.accept('./app', async () => {
      const { createApp } = await import('./app')
      const app = await createApp({ render })

      httpServer.removeListener('request', _currentApp)
      httpServer.addListener('request', app)

      _currentApp = app
    })
    module.hot.accept('./agenda', async () => {
      const { startAgenda, stopAgenda } = await import('./agenda')
      await _stopCurrentAgenda()
      await startAgenda()

      _stopCurrentAgenda = stopAgenda
    })
  }
})()
