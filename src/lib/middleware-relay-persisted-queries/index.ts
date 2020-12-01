import { Handler } from 'express'
import asyncHandler from 'express-async-handler'

const queryMapCache: {
  [queryHash: string]: string
} = {}

export function hydrateQuery(
  getQuery: (queryHash: string) => Promise<string | null>
): Handler {
  return asyncHandler(async (req, res, next) => {
    if (!req.body.id || req.body.id.length !== 32) {
      return next()
    }

    let query: string | null = null

    if (queryMapCache[req.body.id]) {
      query = queryMapCache[req.body.id]
    }
    if (!query) {
      query = await getQuery(req.body.id)
    }

    if (query) {
      queryMapCache[req.body.id] = query
      req.body.query = query
    }

    return next()
  })
}
