import React from 'react'
import PropTypes from 'prop-types'
import './ButtonGroup.scss'

const ButtonGroup = ({ children, className }) => {
  return <div className={`button-group ${className || ''}`}>{children}</div>
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default ButtonGroup
