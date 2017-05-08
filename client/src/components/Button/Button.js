import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func
  }

  render () {
    const {
      children,
      onClick
    } = this.props

    return (
      <button className="button" onClick={onClick}>
        {children}
      </button>
    )
  }
}

export default Button
