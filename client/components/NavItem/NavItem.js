import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './NavItem.scss'

class NavItem extends Component {
  render() {
    const { children, className, to } = this.props

    const classNames = `nav-item ${className || ''}`

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
}

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string
}

export default NavItem
