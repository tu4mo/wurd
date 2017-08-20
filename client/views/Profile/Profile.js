// Import dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// Import actions
import { logOut } from '~/actions/auth'
import { fetchUserByUsername, followUser, unfollowUser } from '~/actions/users'
import { fetchPostById, fetchPostsByUsername } from '~/actions/posts'

// Import selectors
import { isAuthenticated } from '~/selectors/auth'
import { getPostById, getPostsByUsername } from '~/selectors/posts'
import { getAuthenticatedUser, getUser } from '~/selectors/users'

// Import components
import Button from '~/components/Button'
import FollowButton from '~/components/FollowButton'
import Icon from '~/components/Icon'
import Posts from '~/components/Posts'
import ProfilePhoto from '~/components/ProfilePhoto'
import Settings from '~/components/Settings'
import Stats from '~/components/Stats'
import UserList from '~/components/UserList'

// Import styles
import './Profile.scss'

class Profile extends Component {
  static propTypes = {
    fetchPostById: PropTypes.func.isRequired,
    fetchPostsByUsername: PropTypes.func.isRequired,
    fetchUserByUsername: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isMe: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    singlePost: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { username, postId } = this.props.match.params
    this.getUserForProfile(username, postId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { postId, username } = nextProps.match.params
      this.getUserForProfile(username, postId)
    }
  }

  getUserForProfile = (username, postId) => {
    this.props.fetchUserByUsername(username).catch(err => {
      if (err.response.status === 404) {
        this.props.history.push('/404')
      }
    })

    if (postId && !['followers', 'following', 'settings'].includes(postId)) {
      this.props.fetchPostById(postId)
    } else {
      this.props.fetchPostsByUsername(username)
    }
  }

  onLogOutClick = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    const { isAuthenticated, isMe, posts, singlePost, user } = this.props

    if (!Object.keys(user).length) return null

    return [
      <div className="container container--with-y-padding" key="1">
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
              <Route
                path="/:username/settings"
                children={({ match }) =>
                  !match &&
                  <Link to={`/${user.username}/settings`}>
                    <Icon name="settings" />
                  </Link>}
              />}
            {isMe &&
              <Button onClick={this.onLogOutClick} secondary>
                Log Out
              </Button>}
          </div>
        </div>
      </div>,
      <Switch key="2">
        <Route path="/:username/settings" component={Settings} />
        <Route>
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
                <Route path="/:username/:postId">
                  <Posts posts={singlePost} />
                </Route>
              </Switch>
            </div>
          </div>
        </Route>
      </Switch>
    ]
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = getAuthenticatedUser(state) || {}
  const { postId, username: userFromUrl } = ownProps.match.params

  return {
    isAuthenticated: isAuthenticated(state),
    isMe: user.username === userFromUrl,
    posts: getPostsByUsername(userFromUrl)(state),
    singlePost: { [postId]: getPostById(postId)(state) },
    user: getUser(userFromUrl)(state) || {}
  }
}

export default connect(mapStateToProps, {
  fetchPostById,
  fetchPostsByUsername,
  fetchUserByUsername,
  followUser,
  logOut,
  unfollowUser
})(Profile)
