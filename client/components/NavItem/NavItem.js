import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import './NavItem.scss'

const NavItem = ({ children, className, disableHover, to }) => {
  const classNames = classnames(
    'nav-item',
    { 'nav-item--has-hover': !disableHover },
    className
  )

  return to ? (
    <NavLink
      activeClassName="nav-item--active"
      className={classNames}
      exact={to === '/'}
      to={to}
    >
      {children}
    </NavLink>
  ) : (
    <div className={classNames}>{children}</div>
  )
}

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disableHover: PropTypes.bool,
  to: PropTypes.string
}

NavItem.defaultProps = {
  disableHover: false
}

export default NavItem
