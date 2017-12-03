import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledAlert = styled.div`
  background-color: #f2dede;
  border-radius: var(--radius-sm);
  color: #a94442;
  display: flex;
  justify-content: center;
  padding: var(--spacing-sm);
`

const Alert = ({ message }) => <StyledAlert>{message}</StyledAlert>

Alert.propTypes = {
  message: PropTypes.string
}

export default Alert
