import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import throttle from '../../utils/throttle'

import Button from '../Button'
import Composer from '../Composer'
import Container from '../Container'
import NavItem from '../NavItem'
import ProfilePhoto from '../ProfilePhoto'
import logo from './svg/wurd.svg'
import './Header.scss'

class Header extends PureComponent {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
    fetchUserByUsername: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    profileUrl: PropTypes.string,
    username: PropTypes.string
  }

  state = {
    isComposerOpen: false,
    isHidden: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScrollThrottled)
    this.previousScrollPosition = window.pageYOffset
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollThrottled)
  }

  previousScrollPosition = null

  onScrollThrottled = throttle(() => this.onScroll(), 50)

  onScroll = () => {
    const scrollPosition = window.pageYOffset

    if (scrollPosition > 100 && this.previousScrollPosition < scrollPosition) {
      this.setState({
        isHidden: true
      })
    } else {
      this.setState({
        isHidden: false
      })
    }

    this.previousScrollPosition = scrollPosition
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

  onComposerSaveClick = data => {
    const { createPost, fetchUserByUsername, username } = this.props

    createPost(data).then(() => {
      this.setState({
        isComposerOpen: false
      })
      fetchUserByUsername(username)
    })
  }

  render() {
    const { isAuthenticated, profileUrl, username } = this.props
    const { isComposerOpen, isHidden } = this.state

    const classNames = classnames('header-container', {
      'header-container--hidden': isHidden && !isComposerOpen,
      'header-container--with-composer': isComposerOpen
    })

    return (
      <div className={classNames}>
        <div className="header-container__shadow">
          <header className="header">
            <Container disablePadding fullHeight>
              <nav className="navbar">
                <NavItem className="header__logo navbar__item" to="/">
                  <img alt="Wurd" src={logo} title="Wurd" />
                </NavItem>
                {isAuthenticated && (
                  <NavItem className="header__users navbar__item" to="/users">
                    Users
                  </NavItem>
                )}
                {isAuthenticated && (
                  <NavItem className="header__new-post" disableHover>
                    <Button onClick={this.onNewPostClick}>New Post</Button>
                  </NavItem>
                )}
                {isAuthenticated && (
                  <NavItem className="header__profile" to={`/${username}`}>
                    <ProfilePhoto
                      size="small"
                      url={profileUrl}
                      username={username}
                    />
                  </NavItem>
                )}
              </nav>
            </Container>
          </header>
          <Composer
            isOpen={isComposerOpen}
            onCloseClick={this.onComposerCloseClick}
            onSaveClick={this.onComposerSaveClick}
          />
        </div>
      </div>
    )
  }
}

export default Header
