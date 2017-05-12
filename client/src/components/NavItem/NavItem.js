import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './NavItem.scss'

const NavItem = ({ children, className, to, isActive }) => {
  const classNames = ['nav-item']

  if (isActive) {
    classNames.push('nav-item--active')
  }

  classNames.push(className)

  return (
    <div className={classNames.join(' ')}>
      {to
        ? <Link to={to}>
            {children}
          </Link>
        : children}
    </div>
  )
}

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isActive: PropTypes.boolean,
  to: PropTypes.string
}

export default NavItem
