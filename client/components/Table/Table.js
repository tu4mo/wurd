import React from 'react'
import PropTypes from 'prop-types'
import './Table.scss'

const Table = ({ children, className }) =>
  <table className={`table ${className}`}>
    <tbody>
      {children}
    </tbody>
  </table>

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Table
