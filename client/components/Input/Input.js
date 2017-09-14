import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Input.scss'

const Input = props => {
  const {
    className,
    color,
    error,
    id,
    maxLength,
    onChange,
    placeholder,
    type,
    value,
    ...rest
  } = props

  const classNames = classnames('input', {
    'input--gray': color === 'gray',
    'input--none': color === 'none'
  })

  return (
    <div className={className}>
      <input
        {...rest}
        className={classNames}
        id={id}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && <span className="input__error">{error}</span>}
    </div>
  )
}

Input.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}

export default Input
