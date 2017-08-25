import React, { Component } from 'react'
import Spinner from './components/Spinner'

export default loader =>
  class AsyncComponent extends Component {
    state = { Component: AsyncComponent.Component }

    componentWillMount() {
      if (!this.state.Component) {
        loader().then(Component => {
          AsyncComponent.Component = Component

          this.setState({ Component })
        })
      }
    }

    Component = null

    render() {
      if (this.state.Component) {
        return <this.state.Component {...this.props} />
      }

      return (
        <div className="container container--with-y-padding">
          <Spinner />
        </div>
      )
    }
  }
