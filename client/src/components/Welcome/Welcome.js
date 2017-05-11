import React, { Component } from 'react'
import './Welcome.scss'

class Welcome extends Component {
  render () {
    return (
      <div className="welcome">
        <div className="container">
          <h2 className="welcome__tagline">
            The one-word nanoblogging<br />
            social networking service
          </h2>
        </div>
      </div>
    )
  }
}

export default Welcome
