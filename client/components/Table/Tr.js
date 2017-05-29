import React from 'react'
import PropTypes from 'prop-types'

const Tr = ({ children }) => {
  return <tr>{children}</tr>
}

Tr.propTypes = {
  children: PropTypes.node
}

export default Tr
