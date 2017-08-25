import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import classnames from 'classnames'
import Input from '../Input'
import './FormControl.scss'

const renderField = field => {
  return (
    <div className="form-control__input">
      <Input
        {...field.input}
        color={field.color}
        error={field.meta.touched && field.meta.error ? field.meta.error : null}
        maxLength={field.maxLength}
        placeholder={field.placeholder}
        type={field.type}
      />
    </div>
  )
}

const FormControl = ({
  className,
  color,
  label,
  maxLength,
  name,
  placeholder,
  type
}) => {
  const classNames = classnames('form-control', className)

  return (
    <div className={classNames}>
      {label &&
        <label className="form-control__label">
          {label}
        </label>}
      <Field
        component={renderField}
        name={name}
        props={{ color, maxLength, placeholder, type }}
      />
    </div>
  )
}

FormControl.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string
}

export default FormControl
