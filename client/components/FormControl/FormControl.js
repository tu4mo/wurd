import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import styled from 'styled-components'

import Input from '../Input'

const renderField = field => {
  return (
    <Input
      {...field.input}
      color={field.color}
      error={field.meta.touched && field.meta.error ? field.meta.error : null}
      id={field.id}
      maxLength={field.maxLength}
      placeholder={field.placeholder}
      type={field.type}
    />
  )
}

const Wrapper = styled.label`
  display: block;
`

const StyledLabel = styled.div`
  color: var(--color-gray);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
`

const FormControl = ({ color, label, maxLength, name, placeholder, type }) => {
  const id = `input-${name}`

  return (
    <Wrapper htmlFor={id}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <Field
        component={renderField}
        name={name}
        props={{ color, id, maxLength, placeholder, type }}
      />
    </Wrapper>
  )
}

FormControl.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string
}

export default FormControl
