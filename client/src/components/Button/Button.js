import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func
  }

  render () {
    const {
      children,
      className,
      onClick
    } = this.props

    return (
      <button className={`button ${className}`} onClick={onClick}>
        {children}
      </button>
    )
  }
}

export default Button
