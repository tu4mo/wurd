import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import throttle from '~/utils/throttle'
import { fetchUserByUsername } from '~/actions/users'
import { createPost } from '~/actions/posts'
import { getAuthenticatedUser } from '~/selectors/users'
import { isAuthenticated } from '~/selectors/auth'
import Button from '~/components/Button'
import Composer from '~/components/Composer'
import NavItem from '~/components/NavItem'
import ProfilePhoto from '~/components/ProfilePhoto'
import logo from './svg/wurd.svg'
import './Header.scss'

class Header extends Component {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
    fetchUserByUsername: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
  }

  state = {
    isComposerOpen: false,
    isHidden: false
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.onScroll, 200))
    this.previousScrollPosition = window.pageYOffset
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  previousScrollPosition = null

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
    this.props.createPost(data).then(() => {
      this.setState({
        isComposerOpen: false
      })
      this.props.fetchUserByUsername(this.props.user.username)
    })
  }

  render() {
    const { isAuthenticated, user } = this.props
    const { isComposerOpen, isHidden } = this.state

    const classNames = classnames('header-container', {
      'header-container--hidden': isHidden && !isComposerOpen,
      'header-container--with-composer': isComposerOpen
    })

    return (
      <div className={classNames}>
        <div className="header-container__shadow">
          <header className="header">
            <div className="container container--full-height container--without-padding">
              <nav className="navbar">
                <NavItem to="/" className="header__logo navbar__item">
                  <img alt="Wurd" src={logo} title="Wurd" />
                </NavItem>
                {isAuthenticated && (
                  <NavItem to="/users" className="header__users navbar__item">
                    Users
                  </NavItem>
                )}
                {isAuthenticated && (
                  <NavItem className="header__new-post" disableHover>
                    <Button onClick={this.onNewPostClick}>New Post</Button>
                  </NavItem>
                )}
                {isAuthenticated && (
                  <NavItem className="header__profile" to={`/${user.username}`}>
                    <ProfilePhoto size="small" url={user.profileUrl} />
                  </NavItem>
                )}
              </nav>
            </div>
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

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  user: getAuthenticatedUser(state)
})

export default connect(mapStateToProps, {
  createPost,
  fetchUserByUsername
})(Header)
