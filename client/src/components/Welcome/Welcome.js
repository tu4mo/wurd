import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUser, logIn } from '../../actions/auth'
import Button from '../../components/Button'
import './Welcome.scss'

class Welcome extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    logIn: PropTypes.func.isRequired
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
    this.props.logIn(this.state.email, this.state.password).then(() => {
      this.props.getUser()
    })
  }

  render() {
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

export default connect(null, { getUser, logIn })(Welcome)
