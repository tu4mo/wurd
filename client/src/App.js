import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import asyncComponent from './asyncComponent'
import Header from './partials/Header'
import ScrollToTop from './components/ScrollToTop'
import './App.scss'

class App extends Component {
  render() {
    const Home = asyncComponent(() =>
      import('./pages/Home').then(module => module.default)
    )
    const NotFound = asyncComponent(() =>
      import('./pages/NotFound').then(module => module.default)
    )
    const Profile = asyncComponent(() =>
      import('./pages/Profile').then(module => module.default)
    )

    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className="app">
            <main className="main">
              <Switch>
                <Route exact path="/" component={Home} />
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

export default App
