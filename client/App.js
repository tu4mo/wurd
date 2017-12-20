import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { authenticateUser } from './actions/auth'
import { isAuthenticated } from './selectors/auth'
import asyncComponent from './asyncComponent'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import ToolBar from './components/ToolBar'

import './App.scss'

const Main = styled.main`
  padding-bottom: var(--toolbar-height);
  padding-top: var(--header-height);
  position: relative;
  z-index: 0;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding-bottom: 0;
  }
`

const AuthenticateToken = asyncComponent(() =>
  import('./views/AuthenticateToken').then(module => module.default)
)

const Home = asyncComponent(() =>
  import('./views/Home').then(module => module.default)
)

const NotFound = asyncComponent(() =>
  import('./views/NotFound').then(module => module.default)
)

const Profile = asyncComponent(() =>
  import('./views/Profile').then(module => module.default)
)

const Users = asyncComponent(() =>
  import('./views/Users').then(module => module.default)
)

const Welcome = asyncComponent(() =>
  import('./views/Welcome').then(module => module.default)
)

class App extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.authenticateUser()
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className="app">
            <Route component={Header} />
            <Main>
              <Switch>
                <Route
                  component={isAuthenticated ? Home : Welcome}
                  exact
                  path="/"
                />
                <Route component={NotFound} path="/404" />
                <Route
                  component={AuthenticateToken}
                  exact
                  path="/auth/:token"
                />
                <Route component={Users} path="/users" />
                <Route component={Profile} exact path="/:username" />
                <Route component={Profile} path="/:username/:postId" />
              </Switch>
            </Main>
            {isAuthenticated && <Route component={ToolBar} path="/" />}
          </div>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state)
})

export default connect(mapStateToProps, { authenticateUser })(App)
