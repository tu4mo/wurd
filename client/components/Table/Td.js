import React from 'react'
import PropTypes from 'prop-types'

const Td = ({ children, colSpan, style }) =>
  <td colSpan={colSpan} style={style}>
    {children}
  </td>

Td.propTypes = {
  children: PropTypes.node,
  colSpan: PropTypes.string,
  style: PropTypes.object
}

export default Td
