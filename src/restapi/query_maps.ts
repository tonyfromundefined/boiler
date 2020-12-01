import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { QueryMap } from '~/models'

const queryMaps = Router()

/**
 * Upload Query Map created in Relay Compiler to MongoDB
 * for Persisted Queries
 */
queryMaps.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const queryMaps = await QueryMap.find({
      queryHash: {
        $in: Object.keys(req.body),
      },
    })

    const updatePromises = queryMaps.map((queryMap) => {
      const promise = queryMap
        .updateOne({
          query: req.body[queryMap.queryHash],
        })
        .exec()

      delete req.body[queryMap.queryHash]

      return promise
    })

    const createPromises = Object.keys(req.body).map((queryHash) => {
      return QueryMap.create({
        queryHash,
        query: req.body[queryHash],
      })
    })

    await Promise.all([...updatePromises, ...createPromises])

    return res.status(200).json({
      ok: true,
    })
  })
)

export default queryMaps
