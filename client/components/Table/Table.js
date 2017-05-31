import React from 'react'
import PropTypes from 'prop-types'
import './Table.scss'

const Table = ({ children, className }) => {
  return <table className={`table ${className}`}>{children}</table>
}

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Table