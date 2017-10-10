import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Box = ({ children, className }) => (
  <div className={className}>{children}</div>
)

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

const StyledBox = styled(Box)`
  background-color: #fff;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
`

export default StyledBox
