import { Router } from 'express'

import ping from './ping'

const restapi = Router()

restapi.use('/ping', ping)

export default restapi
