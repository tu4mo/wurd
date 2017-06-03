import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUserByUsername } from '../../actions/users'
import { createPost, fetchPostsByUsername } from '../../actions/posts'
import { getAuthenticatedUser } from '../../selectors/users'
import Button from '../../components/Button'
import Composer from '../../components/Composer'
import NavItem from '../../components/NavItem'
import ProfilePhoto from '../../components/ProfilePhoto'
import logo from '../../assets/wurd.svg'
import './Header.scss'

class Header extends Component {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
    fetchPostsByUsername: PropTypes.func.isRequired,
    fetchUserByUsername: PropTypes.func.isRequired,
    user: PropTypes.object
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

  onComposerSaveClick = data => {
    this.props.createPost(data).then(() => {
      this.setState({
        isComposerOpen: false
      })
      this.props.fetchUserByUsername(this.props.user.username)
      this.props.fetchPostsByUsername(this.props.user.username)
    })
  }

  render() {
    const { user } = this.props
    const { isComposerOpen } = this.state

    return (
      <div
        className={`header-container ${isComposerOpen
          ? 'header-container--with-composer'
          : ''}`}
      >
        <div className="header-container__shadow">
          <header className="header">
            <div className="container container--full-height">
              <nav className="navbar">
                <NavItem to="/">
                  <img alt="Wurd" className="logo" src={logo} title="Wurd" />
                </NavItem>
                {user &&
                  <NavItem className="header__new-post">
                    <Button onClick={this.onNewPostClick}>New Post</Button>
                  </NavItem>}
                {user &&
                  <NavItem className="header__profile" to={`/${user.username}`}>
                    <ProfilePhoto size="small" url={user.profileUrl} />
                  </NavItem>}
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
  user: getAuthenticatedUser(state)
})

export default connect(mapStateToProps, {
  createPost,
  fetchPostsByUsername,
  fetchUserByUsername
})(Header)
