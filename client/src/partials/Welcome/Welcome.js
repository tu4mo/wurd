import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import Button from '../../components/Button'
import './Welcome.scss'

class Welcome extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

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
    this.props.login(this.state.email, this.state.password)
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
            <Button className="login__button" onClick={this.onLogInClick}>
              Log In
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { login })(Welcome)
