import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import asyncComponent from './asyncComponent'
import Header from './partials/Header'
import Home from './pages/Home'
import './App.scss'

class App extends Component {
  render () {
    const Profile = asyncComponent(() => import('./pages/Profile').then(module => module.default))

    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/:user" component={Profile} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
