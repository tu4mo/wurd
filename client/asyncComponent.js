import React, { Component } from 'react'

import Container from './components/Container'
import Spinner from './components/Spinner'

export default loader =>
  class AsyncComponent extends Component {
    state = { Component: AsyncComponent.Component }

    componentWillMount() {
      this._isMounted = true

      if (!this.state.Component) {
        loader().then(Component => {
          if (!this._isMounted) return

          AsyncComponent.Component = Component

          this.setState({ Component })
        })
      }
    }

    componentWillUnmount() {
      this._isMounted = false
    }

    Component = null
    _isMounted = false

    render() {
      if (this.state.Component) {
        return <this.state.Component {...this.props} />
      }

      return (
        <Container withYPadding>
          <Spinner />
        </Container>
      )
    }
  }
