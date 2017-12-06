import React from 'react'
import styled from 'styled-components'

import Head from '~/components/Head'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  margin-top: calc(var(--header-height) * -1);
`

const NotFound = () => (
  <Wrapper>
    <Head>
      <title>Page not found</title>
    </Head>
    <h1>404</h1>
  </Wrapper>
)

export default NotFound
