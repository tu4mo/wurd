import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { logInWithToken } from '~/actions/auth'

import Spinner from '~/components/Spinner'

class AuthenticateToken extends Component {
  static propTypes = {
    logInWithToken: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    redirect: false
  }

  componentDidMount() {
    const { logInWithToken, match } = this.props

    logInWithToken(match.params.token).then(() =>
      this.setState({ redirect: true })
    )
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <div className="container container--with-y-padding">
        <Spinner />
      </div>
    )
  }
}

export default connect(null, { logInWithToken })(AuthenticateToken)
