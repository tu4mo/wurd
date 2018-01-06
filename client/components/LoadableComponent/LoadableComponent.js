import React from 'react'
import Loadable from 'react-loadable'

import Container from '../Container'
import Spinner from '../Spinner'

const Loading = () => (
  <Container withYPadding>
    <Spinner />
  </Container>
)

const LoadableComponent = loader =>
  Loadable({
    loader,
    loading: Loading
  })

export default LoadableComponent
