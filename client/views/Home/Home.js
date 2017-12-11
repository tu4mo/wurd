import React, { Component } from 'react'

// Import components
import Container from '~/components/Container'
import Head from '~/components/Head'
import Posts from '~/components/Posts'

class Home extends Component {
  render() {
    return (
      <Container withYPadding>
        <Head>
          <title>Home</title>
        </Head>
        <Posts timeline="home" />
      </Container>
    )
  }
}

export default Home
