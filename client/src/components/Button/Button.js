import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    secondary: PropTypes.bool
  }

  render() {
    const { children, className, onClick, secondary } = this.props

    const classNames = ['button']

    if (secondary) {
      classNames.push('button--secondary')
    }

    if (className) {
      classNames.push(className)
    }

    return (
      <button className={classNames.join(' ')} onClick={onClick}>
        {children}
      </button>
    )
  }
}

export default Button
