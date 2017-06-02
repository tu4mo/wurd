import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import './SignInUp.scss'

class SignInUp extends Component {
  static propTypes = {
    onLoginSubmit: PropTypes.func.isRequired,
    onSignUpSubmit: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    passwordConfirm: '',
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
        passwordConfirm: this.state.passwordConfirm,
        username: this.state.username
      })
    }
  }

  render() {
    const { email, password, passwordConfirm, tab, username } = this.state

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
          {tab === 'signup' &&
            <input
              className="sign-in-up__input sign-in-up__input--bottom"
              type="password"
              onChange={this.onInputChange('passwordConfirm')}
              placeholder="confirm password"
              value={passwordConfirm}
            />}
          <Button className="sign-in-up__button">
            {tab === 'signup' ? 'Sign Up' : 'Log In'}
          </Button>
        </div>
      </form>
    )
  }
}

export default SignInUp
