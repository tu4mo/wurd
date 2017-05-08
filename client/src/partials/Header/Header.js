import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import Button from '../../components/Button'
import Composer from '../../components/Composer'
import logo from '../../assets/wurd.svg'
import './Header.scss'

class Header extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    isComposerOpen: false
  }

  onNewPostClick = () => {
    this.setState({
      isComposerOpen: true
    })
  }

  onComposerCloseClick = () => {
    this.setState({
      isComposerOpen: false
    })
  }

  render () {
    const { location } = this.props
    const { isComposerOpen } = this.state

    const classNames = ['header']

    if (isComposerOpen) {
      classNames.push('header--with-composer')
    }

    return (
      <header className={classNames.join(' ')}>
        <div className="container">
          <nav className="navbar">
            <NavBarItem to="/" location={location}>
              <img alt="Wurd" className="logo" src={logo} title="Wurd" />
            </NavBarItem>
            <div className="navbar__item navbar__item--ml-auto navbar__item--mr">
              <Button onClick={this.onNewPostClick}>New Post</Button>
            </div>
            <NavBarItem to="/tu4mo" location={location}>
              <img className="navbar__profile" src="http://placehold.it/40x40" />
            </NavBarItem>
          </nav>
        </div>
        <Composer isOpen={isComposerOpen} onCloseClick={this.onComposerCloseClick} />
      </header>
    )
  }
}

const NavBarItem = ({ children, to, location }) => {
  const classNames = ['navbar__item']

  if (location.pathname === to) classNames.push('navbar__item--active')

  return (
    <div className={classNames.join(' ')}>
      <Link to={to}>
        {children}
      </Link>
    </div>
  )
}

NavBarItem.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  to: PropTypes.string
}

export default withRouter(Header)
