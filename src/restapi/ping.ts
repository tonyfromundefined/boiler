import { Router } from 'express'
import R from 'ramda'
import { executeOperation } from '~/graphql'

const ping = Router()

ping.get('/', (req, res) => {
  R.pipe(
    () =>
      executeOperation(req, res, {
        query: /* GraphQL */ `
          query Ping {
            ping
          }
        `,
      }),
    R.andThen((result) => res.json(result))
  )()
})

export default ping
