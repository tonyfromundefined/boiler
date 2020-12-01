import Link from 'next/link'
import React from 'react'
import { graphql, QueryRenderer } from 'react-relay'

import styled from '@emotion/styled'

import { PageVersionQuery } from '../__generated__/PageVersionQuery.graphql'
import {
  getEnvironment,
  getRelayServerSideProps,
  NextPageRelay,
} from '../relay'
import Version from './Version'

const PageVersion: NextPageRelay = ({ relaySource }) => {
  return (
    <QueryRenderer<PageVersionQuery>
      environment={getEnvironment(relaySource)}
      query={query}
      variables={{}}
      fetchPolicy="store-and-network"
      render={({ error, props }) => {
        if (!props) {
          return <Container>loading...</Container>
        }
        return (
          <Container>
            <Version query={props} />
            <Link href="/">Back to Home</Link>
          </Container>
        )
      }}
    />
  )
}

const query = graphql`
  query PageVersionQuery {
    ...Version_query
  }
`

export const getServerSideProps = getRelayServerSideProps<PageVersionQuery>({
  query,
})

const Container = styled.div``

const Title = styled.h1``

export default PageVersion
