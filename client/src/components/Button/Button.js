import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

class Button extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    const { children } = this.props

    return (
      <button className="button">
        {children}
      </button>
    )
  }
}

export default Button
