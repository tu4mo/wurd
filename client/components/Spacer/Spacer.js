import React from 'react'
import PropTypes from 'prop-types'
import './Spacer.scss'

const Spacer = ({ children }) => <div className="spacer">{children}</div>

Spacer.propTypes = {
  children: PropTypes.node
}

export default Spacer
