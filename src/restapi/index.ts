import { Router } from 'express'

import ping from './ping'
import queryMaps from './query_maps'

const restapi = Router()

restapi.use('/ping', ping)
restapi.use('/query_maps', queryMaps)

export default restapi
