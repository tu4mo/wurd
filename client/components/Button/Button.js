import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../Spinner'
import './Button.scss'

class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    link: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    secondary: PropTypes.bool,
    type: PropTypes.string
  }

  render() {
    const {
      children,
      className,
      disabled,
      link,
      loading,
      onClick,
      secondary,
      type
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
        type={type}
      >
        {children}
        {loading &&
          <div className="button__spinner">
            <Spinner />
          </div>}
      </button>
    )
  }
}

export default Button
