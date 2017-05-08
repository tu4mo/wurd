import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './partials/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import './App.scss'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:user" component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
