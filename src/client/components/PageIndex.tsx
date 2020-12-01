import Link from 'next/link'
import React from 'react'
import { graphql, QueryRenderer } from 'react-relay'

import styled from '@emotion/styled'

import { PageIndexQuery } from '../__generated__/PageIndexQuery.graphql'
import {
  getEnvironment,
  getRelayServerSideProps,
  NextPageRelay,
} from '../relay'

const PageIndex: NextPageRelay = ({ relaySource }) => {
  return (
    <QueryRenderer<PageIndexQuery>
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
            <Title>Hello, Undefined!</Title>
            <div>ping: {String(props.ping)}</div>
            <Link href="/version">Show Version</Link>
          </Container>
        )
      }}
    />
  )
}

const query = graphql`
  query PageIndexQuery {
    ping
  }
`

export const getServerSideProps = getRelayServerSideProps<PageIndexQuery>({
  query,
})

const Container = styled.div``

const Title = styled.h1``

export default PageIndex
