import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    link: PropTypes.bool,
    onClick: PropTypes.func,
    secondary: PropTypes.bool
  }

  render() {
    const {
      children,
      className,
      disabled,
      link,
      onClick,
      secondary
    } = this.props

    const classNames = ['button']

    if (secondary) {
      classNames.push('button--secondary')
    } else if (link) {
      classNames.push('button--link')
    } else {
      classNames.push('button--outline')
    }

    if (className) {
      classNames.push(className)
    }

    return (
      <button
        className={classNames.join(' ')}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}

export default Button
