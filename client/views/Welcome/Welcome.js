import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logIn, signUp } from '~/actions/auth'
import { getAuthenticationError } from '~/selectors/auth'
import SignInUp from '~/components/SignInUp'
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

  onSignUpSubmit = ({ email, password, username }) => {
    this.props.signUp(username, email, password)
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
            errorMessage={error}
            onLoginSubmit={this.onLogInSubmit}
            onSignUpSubmit={this.onSignUpSubmit}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: getAuthenticationError(state)
})

export default connect(mapStateToProps, { logIn, signUp })(Welcome)
