import React, { Component } from 'react'
import Button from '../Button'
import './Welcome.scss'

class Welcome extends Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value })
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  onLogInClick = () => {
    console.log(this.state)
  }

  render () {
    return (
      <div className="welcome">
        <div className="container">
          <h2 className="welcome__tagline">
            The one-word nanoblogging<br />
            social networking service
          </h2>
          <div className="login">
            <input
              className="login__input login__input--email"
              placeholder="email"
              onChange={this.onEmailChange}
              value={this.state.email}
            />
            <input
              className="login__input login__input--password"
              type="password"
              onChange={this.onPasswordChange}
              placeholder="password"
              value={this.state.password}
            />
            <div className="login__buttons">
              <Button onClick={this.onLogInClick}>Log In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
