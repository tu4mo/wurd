import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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

    const classNames = classnames(
      'button',
      {
        'button--secondary': secondary,
        'button--link': link,
        'button--outline': !secondary && !link
      },
      className
    )

    return (
      <button
        className={classNames}
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
