import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Table.scss'

const Table = ({ children, className }) =>
  <table className={classnames('table', className)}>
    <tbody>
      {children}
    </tbody>
  </table>

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Table
