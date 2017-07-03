import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormControl.scss'

const renderField = field => {
  const classNames = ['input']

  if (field.color === 'gray') {
    classNames.push('input--gray')
  }

  return (
    <div className="form-control__input">
      <input
        {...field.input}
        className={classNames.join(' ')}
        maxLength={field.maxLength}
        type={field.type}
      />
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">
          {field.meta.error}
        </span>}
    </div>
  )
}

const FormControl = ({ color, label, maxLength, name, type }) =>
  <div className="form-control">
    <label className="form-control__label">
      {label}
    </label>
    <Field
      component={renderField}
      name={name}
      props={{ color, maxLength, type }}
    />
  </div>

FormControl.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
}

export default FormControl
