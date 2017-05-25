import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logIn, signUp } from '../../actions/auth'
import { getAuthenticationError } from '../../selectors/auth'
import Alert from '../../components/Alert'
import SignInUp from '../../components/SignInUp'
import './Welcome.scss'

class Welcome extends Component {
  static propTypes = {
    error: PropTypes.string,
    logIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired
  }

  onLogInSubmit = ({ email, password }) => {
    this.props.logIn(email, password)
  }

  onSignUpSubmit = ({ email, password, passwordConfirm, username }) => {
    this.props.signUp(username, email, password, passwordConfirm)
  }

  render() {
    const { error } = this.props

    return (
      <div className="welcome">
        <div className="container">
          <h2 className="welcome__tagline">
            The one-word nanoblogging<br />
            social networking service
          </h2>
          <SignInUp
            onLoginSubmit={this.onLogInSubmit}
            onSignUpSubmit={this.onSignUpSubmit}
          />
          {error && <Alert message={error} />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: getAuthenticationError(state)
})

export default connect(mapStateToProps, { logIn, signUp })(Welcome)
