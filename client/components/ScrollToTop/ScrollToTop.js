import { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
