import React, { Component } from 'react'

// Import components
import Posts from '~/components/Posts'

class Home extends Component {
  render() {
    return (
      <div className="container container--with-y-padding">
        <Posts timeline="home" />
      </div>
    )
  }
}

export default Home
