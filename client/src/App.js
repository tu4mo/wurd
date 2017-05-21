import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { authenticateUser } from './actions/auth'
import { getAuthenticatedUsername, isAuthenticated } from './selectors/auth'
import asyncComponent from './asyncComponent'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import './App.scss'

class App extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.authenticateUser()
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isAuthenticated === this.props.isAuthenticated) {
      return false
    }
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

    const Welcome = asyncComponent(() =>
      import('./views/Welcome').then(module => module.default)
    )

    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className="app">
            <Header />
            <main className="main">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={this.props.isAuthenticated ? Home : Welcome}
                />
                <Route path="/404" component={NotFound} />
                <Route path="/:username" component={Profile} />
              </Switch>
            </main>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  authenticatedUsername: getAuthenticatedUsername(state),
  isAuthenticated: isAuthenticated(state)
})

export default connect(mapStateToProps, {
  authenticateUser,
  getAuthenticatedUsername
})(App)
