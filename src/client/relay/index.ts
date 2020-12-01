import { GetStaticPropsContext, NextPage } from 'next/types'
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
  return async (ctx: GetStaticPropsContext) => {
    if (typeof window !== 'undefined') {
      return {
        props: {
          source: {},
        },
      }
    }

    const { environment, source } = getInitialEnvironment()

    await fetchQuery(environment, query, variables?.(ctx) ?? {})

    return {
      props: {
        relaySource: source.toJSON(),
      },
    }
  }
}

export { getEnvironment } from './environment'
