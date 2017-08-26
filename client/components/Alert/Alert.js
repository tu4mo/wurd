import React from 'react'
import PropTypes from 'prop-types'
import './Alert.scss'

const Alert = ({ message }) => <div className="alert">{message}</div>

Alert.propTypes = {
  message: PropTypes.string
}

export default Alert
