import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from '../Alert'
import Button from '../Button'
import './SignInUp.scss'

class SignInUp extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    onLoginSubmit: PropTypes.func.isRequired,
    onSignUpSubmit: PropTypes.func.isRequired
  }

  state = {
    email: '',
    error: '',
    password: '',
    username: '',
    tab: 'login'
  }

  onInputChange = name => e => {
    this.setState({ [name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    if (this.state.tab === 'login') {
      this.props.onLoginSubmit({
        email: this.state.email,
        password: this.state.password
      })
    } else {
      this.props.onSignUpSubmit({
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
    }
  }

  render() {
    const { email, password, tab, username } = this.state
    const { errorMessage } = this.props

    const renderTab = (id, label) => {
      const changeTab = tab => {
        this.setState({
          tab
        })
      }

      return (
        <div
          className={`sign-in-up__tab ${id === tab
            ? 'sign-in-up__tab--active'
            : ''}`}
          onClick={() => changeTab(id)}
        >
          {label}
        </div>
      )
    }

    return (
      <form className="sign-in-up" onSubmit={this.onSubmit}>
        <div className="sign-in-up__tabs">
          {renderTab('login', 'Log In')}
          {renderTab('signup', 'Sign Up')}
        </div>
        <div className="sign-in-up__panel">
          {tab === 'signup' &&
            <input
              className="sign-in-up__input sign-in-up__input--top"
              maxLength="15"
              placeholder="username"
              onChange={this.onInputChange('username')}
              value={username}
            />}
          <input
            className={`sign-in-up__input sign-in-up__input--${tab === 'signup'
              ? 'middle'
              : 'top'}`}
            placeholder="email"
            onChange={this.onInputChange('email')}
            value={email}
          />
          <input
            className={`sign-in-up__input sign-in-up__input--${tab === 'signup'
              ? 'middle'
              : 'bottom'}`}
            type="password"
            onChange={this.onInputChange('password')}
            placeholder="password"
            value={password}
          />
          <Button className="sign-in-up__button">
            {tab === 'signup' ? 'Sign Up' : 'Log In'}
          </Button>
          {errorMessage && <Alert message={errorMessage} />}
        </div>
      </form>
    )
  }
}

export default SignInUp
