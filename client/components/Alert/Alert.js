import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Alert = ({ className, message }) => (
  <div className={className}>{message}</div>
)

Alert.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string
}

const StyledAlert = styled(Alert)`
  background-color: #f2dede;
  border-radius: var(--radius-sm);
  color: #a94442;
  display: flex;
  justify-content: center;
  padding: var(--spacing-sm);
`

export default StyledAlert
