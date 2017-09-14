import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// Import components
import Spinner from '../Spinner'

// Import styles
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
    textOnly: PropTypes.bool,
    type: PropTypes.string
  }

  static defaultProps = {
    type: 'button'
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
      textOnly,
      type
    } = this.props

    const classNames = classnames(
      'button',
      {
        'button--link': link,
        'button--outline': !link && !secondary && !textOnly,
        'button--secondary': secondary,
        'button--text-only': textOnly
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
        {loading && (
          <div className="button__spinner">
            <Spinner />
          </div>
        )}
      </button>
    )
  }
}

export default Button
