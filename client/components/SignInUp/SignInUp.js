import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { propTypes as reduxFormPropTypes, reduxForm } from 'redux-form'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { logIn, signUp } from '~/actions/auth'
import { getAuthenticationError } from '~/selectors/auth'
import Alert from '../Alert'
import Button from '../Button'
import FormControl from '../FormControl'
import Spacer from '../Spacer'
import './SignInUp.scss'

class SignInUp extends Component {
  static propTypes = {
    ...reduxFormPropTypes,
    errorMessage: PropTypes.string
  }

  state = {
    tab: 'login'
  }

  onSubmit = ({ email, password, username }) => {
    if (this.state.tab === 'login') {
      this.props.logIn(email, password)
    } else {
      this.props.signUp(username, email, password)
    }
  }

  renderTab = id => {
    const changeTab = tab => {
      this.setState({
        tab
      })
    }

    return (
      <Button
        className={classnames('sign-in-up__tab', {
          'sign-in-up__tab--active': id === this.state.tab
        })}
        link
        onClick={() => changeTab(id)}
      >
        <FormattedMessage id={id} />
      </Button>
    )
  }

  render() {
    const { tab } = this.state
    const { errorMessage, handleSubmit } = this.props

    return (
      <form className="sign-in-up" onSubmit={handleSubmit(this.onSubmit)}>
        <div className="sign-in-up__tabs">
          {this.renderTab('login')}
          {this.renderTab('signup')}
        </div>
        <div className="sign-in-up__panel">
          <Spacer>
            {tab === 'signup' && (
              <FormControl
                color="gray"
                label="Username"
                maxLength="15"
                name="username"
              />
            )}
            <FormControl color="gray" label="Email" name="email" type="email" />
            <FormControl
              color="gray"
              label="Password"
              name="password"
              type="password"
            />
            <Button className="sign-in-up__button" type="submit">
              <FormattedMessage id={tab} />
            </Button>
            {tab === 'login' && (
              <Button
                className="sign-in-up__button--twitter"
                onClick={() => (location.href = '/api/auth/twitter')}
              >
                <FormattedMessage id="loginWithTwitter" />
              </Button>
            )}
            {errorMessage && <Alert message={errorMessage} />}
          </Spacer>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: getAuthenticationError(state)
})

export default connect(mapStateToProps, { logIn, signUp })(
  reduxForm({
    form: 'signup'
  })(SignInUp)
)
