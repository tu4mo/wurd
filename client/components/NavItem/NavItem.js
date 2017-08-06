import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import './NavItem.scss'

const NavItem = ({ children, className, to }) => {
  const classNames = classnames('nav-item', className)

  return to
    ? <NavLink
        activeClassName="nav-item--active"
        className={classNames}
        exact={to === '/'}
        to={to}
      >
        {children}
      </NavLink>
    : <div className={classNames}>
        {children}
      </div>
}

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string
}

export default NavItem
