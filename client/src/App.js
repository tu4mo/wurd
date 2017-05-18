import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from './actions/auth'
import { isAuthenticated } from './selectors/auth'
import asyncComponent from './asyncComponent'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import './App.scss'

class App extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.getUser()
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
            <Header />
          </div>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state)
})

export default connect(mapStateToProps, { getUser })(App)
