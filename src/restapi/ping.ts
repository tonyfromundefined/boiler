import { Router } from 'express'
import R from 'ramda'
import { executeOperation } from '~/graphql'

import gql from '@boiler/plain-graphql-tag'

const ping = Router()

ping.get('/', (req, res) => {
  R.pipe(
    () =>
      executeOperation(req, res, {
        query: gql`
          query Ping {
            ping
          }
        `,
      }),
    R.andThen((result) => res.json(result))
  )()
})

export default ping
