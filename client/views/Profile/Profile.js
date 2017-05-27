import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOut } from '../../actions/auth'
import {
  fetchUserByUsername,
  followUser,
  unfollowUser
} from '../../actions/users'
import { fetchPostsByUsername } from '../../actions/posts'
import { isAuthenticated } from '../../selectors/auth'
import { getPostsByUsername } from '../../selectors/posts'
import {
  getAuthenticatedUser,
  getUser,
  isFollowingUsername
} from '../../selectors/users'
import Button from '../../components/Button'
import Posts from '../../components/Posts'
import ProfilePhoto from '../../components/ProfilePhoto'
import Settings from '../../components/Settings'
import Stats from '../../components/Stats'
import './Profile.scss'

class Profile extends Component {
  static propTypes = {
    fetchPostsByUsername: PropTypes.func.isRequired,
    fetchUserByUsername: PropTypes.func.isRequired,
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    isMe: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  state = {
    isSettingsOpen: false
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
    this.props.fetchUserByUsername(username).catch(err => {
      if (err.response.status === 404) {
        this.props.history.push('/404')
      }
    })
    this.props.fetchPostsByUsername(username)
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
    const { isAuthenticated, isFollowing, isMe, posts, user } = this.props

    if (!Object.keys(user).length) return null

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
                isMe={isMe}
                url={user.profileUrl}
                username={user.username}
              />
            </div>
            <div className="profile__user">
              <div className="profile__name">{user.username}</div>
              <div className="profile__buttons">
                {isAuthenticated &&
                  !isMe &&
                  <FollowButton isFollowed={isFollowing} />}
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
              {user.following &&
                <Stats
                  followers={user.followers}
                  following={user.following.length}
                  posts={user.posts}
                />}
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
    isFollowing: isFollowingUsername(userFromUrl)(state),
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
  unfollowUser
})(Profile)
