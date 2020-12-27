import { Request, Response } from 'express'
import { graphql as execute } from 'graphql'

import { createContextFactory } from './context'
import { getSchema } from './schema'

const createContext = createContextFactory()

export function executeOperation(
  req: Request,
  res: Response,
  {
    query,
    variables,
  }: {
    query: string
    variables?: object
  }
) {
  return execute({
    schema: getSchema(),
    source: query,
    variableValues: variables,
    contextValue: createContext({ req, res }),
  })
}
