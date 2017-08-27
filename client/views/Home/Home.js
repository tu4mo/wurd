import React, { Component } from 'react'

// Import components
import Head from '~/components/Head'
import Posts from '~/components/Posts'

class Home extends Component {
  render() {
    return (
      <div className="container container--with-y-padding">
        <Head>
          <title>Home</title>
        </Head>
        <Posts timeline="home" />
      </div>
    )
  }
}

export default Home
