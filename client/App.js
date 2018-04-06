import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import { authenticateUser } from './ducks/auth'
import { isAuthenticated, isAuthenticating } from './selectors/auth'
import LoadableComponent from './components/LoadableComponent'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import ToolBar from './components/ToolBar'

import { StyledMain } from './styles'

const AuthenticateToken = LoadableComponent(() =>
  import('./views/AuthenticateToken')
)

const Home = LoadableComponent(() => import('./views/Home'))

const NotFound = LoadableComponent(() => import('./views/NotFound'))

const Profile = LoadableComponent(() => import('./views/Profile'))

const Users = LoadableComponent(() => import('./views/Users'))

const Welcome = LoadableComponent(() => import('./views/Welcome'))

class App extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.authenticateUser()
  }

  render() {
    const { isAuthenticated, isAuthenticating } = this.props

    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className="app">
            <Route component={Header} />
            <StyledMain>
              {!isAuthenticating && (
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
              )}
            </StyledMain>
            {isAuthenticated && <Route component={ToolBar} path="/" />}
          </div>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  isAuthenticating: isAuthenticating(state)
})

export default connect(mapStateToProps, { authenticateUser })(hot(module)(App))
