import React from 'react'
import { graphql, QueryRenderer } from 'react-relay'

import styled from '@emotion/styled'

import { PageIndexQuery } from '../__generated__/PageIndexQuery.graphql'
import { getEnvironment, getRelayServerSideProps } from '../relay'
import Version from './Version'

const PageIndex: React.FC<{ source: any }> = ({ source }) => {
  return (
    <QueryRenderer<PageIndexQuery>
      environment={getEnvironment(source)}
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
            <Version query={props} />
          </Container>
        )
      }}
    />
  )
}

const query = graphql`
  query PageIndexQuery {
    version
    ...Version_query
  }
`

export const getServerSideProps = getRelayServerSideProps<PageIndexQuery>({
  query,
  variables() {
    return {}
  },
})

const Container = styled.div``

const Title = styled.h1``

export default PageIndex
