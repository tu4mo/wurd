import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOut } from '../../actions/auth'
import {
  fetchUserByUsername,
  followUser,
  unfollowUser,
  saveProfilePhoto
} from '../../actions/users'
import { fetchPostsByUsername } from '../../actions/posts'
import { isAuthenticated } from '../../selectors/auth'
import { getPostsByUsername } from '../../selectors/posts'
import { getAuthenticatedUser, getUser } from '../../selectors/users'
import Button from '../../components/Button'
import Posts from '../../components/Posts'
import ProfilePhoto from '../../components/ProfilePhoto'
import Settings from '../../components/Settings'
import Stats from '../../components/Stats'
import './Profile.scss'

class Profile extends Component {
  state = {
    isSettingsOpen: false
  }

  static propTypes = {
    fetchPostsByUsername: PropTypes.func.isRequired,
    fetchUserByUsername: PropTypes.func.isRequired,
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isMe: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    saveProfilePhoto: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.getUserForProfile(this.props.match.params.username)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.getUserForProfile(nextProps.match.params.username)
    }
  }

  getUserForProfile = username => {
    this.props.fetchUserByUsername(username)
    this.props.fetchPostsByUsername(username)
  }

  onProfilePhotoUpload = (e) => {
    if (!this.props.isMe) {
      return
    }

    this.props.saveProfilePhoto(e.target.files[0])
  }

  onFollowClick = () => {
    this.props.followUser(this.props.user.username)
  }

  onUnfollowClick = () => {
    this.props.unfollowUser(this.props.user.username)
  }

  onSettingsClick = () => {
    this.setState(prevState => ({
      isSettingsOpen: !prevState.isSettingsOpen
    }))
  }

  onLogOutClick = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    const { isAuthenticated, isMe, posts, user } = this.props

    const FollowButton = ({ isFollowed }) => (
      <Button onClick={isFollowed ? this.onUnfollowClick : this.onFollowClick}>
        {isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    )

    return (
      <div>
        <div className="container">
          <div className="profile">
            <div className="profile__photo">
              <ProfilePhoto
                onUpload={this.onProfilePhotoUpload}
                url={user.profileUrl}
                username={user.username}
              />
            </div>
            <div className="profile__user">
              <div className="profile__name">{user.username}</div>
              <div className="profile__buttons">
                {isAuthenticated &&
                  !isMe &&
                  <FollowButton isFollowed={user.isFollowed} />}
                {isMe &&
                  <Button onClick={this.onSettingsClick} secondary>
                    Settings
                  </Button>}
                {isMe &&
                  <Button onClick={this.onLogOutClick} secondary>
                    Log Out
                  </Button>}
              </div>
            </div>
            <div className="profile__stats">
              <Stats
                followers={user.followers}
                following={user.following}
                posts={user.posts}
              />
            </div>
          </div>
        </div>
        {this.state.isSettingsOpen && <Settings />}
        <div className="profile-posts">
          <div className="container">
            <Posts posts={posts} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = getAuthenticatedUser(state) || {}
  const userFromUrl = ownProps.match.params.username

  return {
    isAuthenticated: isAuthenticated(state),
    isMe: user.username === userFromUrl,
    posts: getPostsByUsername(userFromUrl)(state),
    user: getUser(userFromUrl)(state) || {}
  }
}

export default connect(mapStateToProps, {
  fetchPostsByUsername,
  fetchUserByUsername,
  followUser,
  logOut,
  saveProfilePhoto,
  unfollowUser
})(Profile)
