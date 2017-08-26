import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const BoxSection = ({ children, className, hasPadding }) => {
  const classNames = classnames(
    'box__section',
    { 'box__section--has-padding': hasPadding },
    className
  )

  return <div className={classNames}>{children}</div>
}

BoxSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasPadding: PropTypes.bool
}

export default BoxSection
