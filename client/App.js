import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { authenticateUser } from './actions/auth'
import { isAuthenticated } from './selectors/auth'
import asyncComponent from './asyncComponent'
import AuthenticateToken from './AuthenticateToken'
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

class App extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.authenticateUser()
  }

  render() {
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

    const { isAuthenticated } = this.props

    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className="app">
            <Route component={Header} />
            <Main>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={isAuthenticated ? Home : Welcome}
                />
                <Route path="/404" component={NotFound} />
                <Route
                  exact
                  path="/auth/:token"
                  component={AuthenticateToken}
                />
                <Route path="/users" component={Users} />
                <Route exact path="/:username" component={Profile} />
                <Route path="/:username/:postId" component={Profile} />
              </Switch>
            </Main>
            {isAuthenticated && <Route path="/" component={ToolBar} />}
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
