import React from 'react'
import PropTypes from 'prop-types'

const Td = ({ children, style }) => {
  return <td style={style}>{children}</td>
}

Td.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export default Td
