import { GetStaticPropsContext } from 'next/types'
import { fetchQuery, GraphQLTaggedNode } from 'react-relay'

import { getInitialEnvironment } from './environment'

export function getRelayServerSideProps<T extends { variables: any }>({
  query,
  variables,
}: {
  query: GraphQLTaggedNode
  variables?: (ctx: GetStaticPropsContext) => T['variables']
}) {
  return async (ctx: GetStaticPropsContext) => {
    const { environment, source } = getInitialEnvironment()

    console.log(source.toJSON())

    await fetchQuery(environment, query, variables?.(ctx) ?? {})

    return {
      props: {
        source: source.toJSON(),
      },
    }
  }
}

export * from './environment'
