import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './NavItem.scss'

const NavItem = ({ children, to, location }) => {
  const classNames = ['nav-item']

  if (location.pathname === to) classNames.push('nav-item--active')

  return (
    <div className={classNames.join(' ')}>
      <Link to={to}>
        {children}
      </Link>
    </div>
  )
}

NavItem.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  to: PropTypes.string
}

export default NavItem
