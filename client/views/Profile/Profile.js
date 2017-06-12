import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
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
import { getAuthenticatedUser, getUser } from '../../selectors/users'
import Button from '../../components/Button'
import FollowButton from '../../components/FollowButton'
import Posts from '../../components/Posts'
import ProfilePhoto from '../../components/ProfilePhoto'
import Settings from '../../components/Settings'
import Stats from '../../components/Stats'
import UserList from '../../components/UserList'
import './Profile.scss'

class Profile extends Component {
  static propTypes = {
    fetchPostsByUsername: PropTypes.func.isRequired,
    fetchUserByUsername: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
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

    if (!Object.keys(user).length) return null

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
              {user.username}
            </div>
            <div className="profile__buttons">
              {isAuthenticated &&
                !isMe &&
                <FollowButton username={user.username} />}
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
        </div>
        {this.state.isSettingsOpen && <Settings />}
        <div className="profile-body">
          <div className="profile-body__tabs">
            {user.followers &&
              user.following &&
              <Stats
                followers={user.followers.length}
                following={user.following.length}
                posts={user.posts}
                username={user.username}
              />}
          </div>
          <div className="container">
            <Switch>
              <Route exact path="/:username">
                <Posts posts={posts} />
              </Route>
              <Route path="/:username/followers">
                <UserList users={user.followers} />
              </Route>
              <Route path="/:username/following">
                <UserList users={user.following} />
              </Route>
            </Switch>
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
  unfollowUser
})(Profile)
