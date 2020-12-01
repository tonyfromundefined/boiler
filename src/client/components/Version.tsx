import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import styled from '@emotion/styled'

import { Version_query } from '../__generated__/Version_query.graphql'

const Version: React.FC<{
  query: Version_query
}> = ({ query }) => {
  return (
    <Container>
      Server Version: <code>{query.version}</code>
    </Container>
  )
}

export default createFragmentContainer(Version, {
  query: graphql`
    fragment Version_query on Query {
      version
    }
  `,
})

const Container = styled.div``
