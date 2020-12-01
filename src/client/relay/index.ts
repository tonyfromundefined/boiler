import { GetStaticPropsContext, NextPage } from 'next/types'
import * as R from 'ramda'
import { fetchQuery, GraphQLTaggedNode } from 'react-relay'

import { getInitialEnvironment } from './environment'

export type NextPageRelay = NextPage<{ relaySource: object }>

export function getRelayServerSideProps<T extends { variables: any }>({
  query,
  variables,
}: {
  query: GraphQLTaggedNode
  variables?: (ctx: GetStaticPropsContext) => T['variables']
}) {
  return R.pipe(
    (ctx: GetStaticPropsContext) => ({ ...getInitialEnvironment(), ctx }),
    ({ environment, source, ctx }) =>
      fetchQuery(environment, query, variables?.(ctx) ?? {}).then(() => source),
    R.andThen((source) => source.toJSON()),
    R.andThen((relaySource) => ({
      props: {
        relaySource,
      },
    }))
  )
}

export { getEnvironment } from './environment'
