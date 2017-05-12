import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUser } from '../../selectors/auth'
import { withRouter } from 'react-router-dom'
import Button from '../../components/Button'
import Composer from '../../components/Composer'
import NavItem from '../../components/NavItem'
import logo from '../../assets/wurd.svg'
import './Header.scss'

class Header extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    onComposerToggle: PropTypes.func,
    user: PropTypes.object
  }

  state = {
    isComposerOpen: false
  }

  onNewPostClick = () => {
    this.setState({
      isComposerOpen: true
    })
    this.props.onComposerToggle(true)
  }

  onComposerCloseClick = () => {
    this.setState({
      isComposerOpen: false
    })
    this.props.onComposerToggle(false)
  }

  render () {
    const { location, user } = this.props
    const { isComposerOpen } = this.state
    console.log(this.props)

    const isNavItemActive = path => {
      return location.pathname === path
    }

    return (
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <NavItem isActive={isNavItemActive('/')} to="/">
              <img alt="Wurd" className="logo" src={logo} title="Wurd" />
            </NavItem>
            {user &&
              <NavItem className="nav-item--ml-auto nav-item--mr">
                <Button onClick={this.onNewPostClick}>New Post</Button>
              </NavItem>
            }
            {user &&
              <NavItem isActive={isNavItemActive(`/${user.username}`)} to={`/${user.username}`}>
                <img className="navbar__profile" src="http://placehold.it/40x40" />
              </NavItem>
            }
          </nav>
        </div>
        <Composer isOpen={isComposerOpen} onCloseClick={this.onComposerCloseClick} />
      </header>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state)
})

export default withRouter(connect(mapStateToProps)(Header))
