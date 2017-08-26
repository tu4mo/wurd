import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Box.scss'

const Box = ({ children, className }) => {
  const classNames = classnames('box', className)

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Box
