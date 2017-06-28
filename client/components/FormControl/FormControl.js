import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormControl.scss'

const renderField = field =>
  <div className="form-control__input">
    <input className="input" {...field.input} type={field.type} />
    {field.meta.touched &&
      field.meta.error &&
      <span className="error">
        {field.meta.error}
      </span>}
  </div>

const FormControl = ({ label, name, type }) =>
  <div className="form-control">
    <label className="form-control__label">
      {label}
    </label>
    <Field component={renderField} name={name} props={{ type }} />
  </div>

FormControl.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
}

export default FormControl
