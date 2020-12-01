import { Request, Response } from 'express'
import { DocumentNode, graphql as execute, print } from 'graphql'

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
    query: DocumentNode
    variables?: object
  }
) {
  return execute({
    schema: getSchema(),
    source: print(query),
    variableValues: variables,
    contextValue: createContext({ req, res }),
  })
}
