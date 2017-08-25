import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Input.scss'

const Input = props => {
  const {
    className,
    color,
    error,
    maxLength,
    placeholder,
    type,
    ...rest
  } = props

  const classNames = classnames('input', {
    'input--gray': color === 'gray'
  })

  return (
    <div className={className}>
      <input
        {...rest}
        className={classNames}
        maxLength={maxLength}
        placeholder={placeholder}
        type={type}
      />
      {error &&
        <span className="input__error">
          {error}
        </span>}
    </div>
  )
}

Input.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string
}

export default Input
