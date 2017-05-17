import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUser, logIn } from '../../actions/auth'
import { getAuhtenticationError } from '../../selectors/auth'
import Alert from '../../components/Alert'
import Button from '../../components/Button'
import './Welcome.scss'

class Welcome extends Component {
  static propTypes = {
    error: PropTypes.string,
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

  onLogInSubmit = e => {
    e.preventDefault()

    this.props
      .logIn(this.state.email, this.state.password)
      .then(() => {
        this.props.getUser()
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const { email, password } = this.state
    const { error } = this.props

    return (
      <div className="welcome">
        <div className="container">
          <h2 className="welcome__tagline">
            The one-word nanoblogging<br />
            social networking service
          </h2>
          <form className="login" onSubmit={this.onLogInSubmit}>
            <input
              className="login__input login__input--email"
              placeholder="email"
              onChange={this.onEmailChange}
              value={email}
            />
            <input
              className="login__input login__input--password"
              type="password"
              onChange={this.onPasswordChange}
              placeholder="password"
              value={password}
            />
            <Button className="login__button">
              Log In
            </Button>
          </form>
          {error && <Alert message={error} />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: getAuhtenticationError(state)
})

export default connect(mapStateToProps, { getUser, logIn })(Welcome)
