import { GetServerSidePropsContext, NextPage } from 'next/types'
import * as R from 'ramda'
import { fetchQuery, GraphQLTaggedNode } from 'react-relay'

import { getInitialEnvironment } from './environment'

export type NextPageRelay = NextPage<{ relaySource: object }>

export function getRelayServerSideProps<T extends { variables: any }>({
  query,
  variables,
}: {
  query: GraphQLTaggedNode
  variables?: (ctx: GetServerSidePropsContext) => T['variables']
}) {
  return (ctx: GetServerSidePropsContext) => {
    const isFirstRequest = ctx.req.url?.indexOf('/_next') === -1

    if (isFirstRequest) {
      return R.pipe(
        (ctx: GetServerSidePropsContext) => ({
          ...getInitialEnvironment(),
          ctx,
        }),
        ({ environment, source, ctx }) =>
          fetchQuery(environment, query, variables?.(ctx) ?? {}).then(
            () => source
          ),
        R.andThen((source) => source.toJSON()),
        R.andThen((relaySource) => ({
          props: {
            relaySource,
          },
        }))
      )(ctx)
    } else {
      return Promise.resolve({
        props: {
          relaySource: null,
        },
      })
    }
  }
}

export { getEnvironment } from './environment'
