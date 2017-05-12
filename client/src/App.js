import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import asyncComponent from './asyncComponent'
import Header from './partials/Header'
import ScrollToTop from './components/ScrollToTop'
import './App.scss'

class App extends Component {
  state = {
    dimmed: false
  }

  onComposerToggle = isOpen => {
    this.setState({
      dimmed: isOpen
    })
  }

  render() {
    const { dimmed } = this.state

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
            <main className={`main ${dimmed ? 'main--dimmed' : ''}`}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/404" component={NotFound} />
                <Route path="/:username" component={Profile} />
              </Switch>
            </main>
            <Header onComposerToggle={this.onComposerToggle} />
          </div>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

export default App
