import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { media } from '../../utils/style'

const StyledInputError = styled.div`
  color: var(--color-red);
`

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

  return (
    <div className={className}>
      <input
        {...rest}
        id={id}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && <StyledInputError>{error}</StyledInputError>}
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

const StyledInput = styled(Input)`
  input {
    background-color: #fff;
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    display: block;
    font-family: inherit;
    font-size: var(--font-size-lg);
    height: 40px;
    outline: none;
    padding: 0 var(--spacing-sm);
    width: 100%;

    ${media.sm`
      font-size: var(--font-size-md);
    `};

    &::-webkit-input-placeholder {
      color: var(--color-light-gray);
    }

    &:focus {
      border-color: var(--color-light-gray);
    }

    ${props =>
      props.color === 'gray' &&
      css`
        background-color: var(--color-background);
      `};

    ${props =>
      props.color === 'none' &&
      css`
        background-color: transparent;
        border: 0;
        border-radius: 0;
        height: auto;
        padding: 0;
      `};
  }
`

export default StyledInput
