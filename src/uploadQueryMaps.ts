import to from 'await-to-js'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import fs from 'fs'
import path from 'path'
import R from 'ramda'

const queryMaps = JSON.parse(
  fs.readFileSync(path.resolve('./queryMaps.json'), 'utf-8')
)

const run = R.pipe(
  () => {
    const client = axios.create({
      baseURL: process.env.BOILER_SERVER_ENDPOINT,
    })
    axiosRetry(client, { retries: 3 })

    return client
  },
  (client) => client.post('/api/query_maps', queryMaps),
  to,
  R.andThen(([err, resp]) => {
    if (resp?.data?.ok) {
      console.log('`queryMap.json` upload completed successfully')
      return process.exit(0)
    } else {
      console.error('`queryMap.json` upload failed')
      return process.exit(1)
    }
  })
)

run()
