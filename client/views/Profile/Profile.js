// Import dependencies
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// Import actions
import { logOut } from '../../ducks/auth'
import {
  fetchUserByUsername,
  followUser,
  unfollowUser
} from '../../ducks/users'

// Import selectors
import { isAuthenticated } from '../../selectors/auth'
import { getMe, getUser } from '../../selectors/users'

// Import components
import Button from '../../components/Button'
import Container from '../../components/Container'
import FollowButton from '../../components/FollowButton'
import Head from '../../components/Head'
import Icon from '../../components/Icon'
import LoadableComponent from '../../components/LoadableComponent'
import Posts from '../../components/Posts'
import ProfilePhoto from '../../components/ProfilePhoto'
import Stats from '../../components/Stats'
import UserList from '../../components/UserList'

// Import styles
import './Profile.scss'

const Settings = LoadableComponent(() => import('../../components/Settings'))

class Profile extends Component {
  static propTypes = {
    fetchUserByUsername: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isMe: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { username } = this.props.match.params
    this.getUserForProfile(username)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { username } = nextProps.match.params
      this.getUserForProfile(username)
    }
  }

  getUserForProfile = username => {
    this.props.fetchUserByUsername(username).catch(err => {
      if (err.response.status === 404) {
        this.props.history.push('/404')
      }
    })
  }

  onLogOutClick = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    const { isAuthenticated, isMe, match, user } = this.props

    if (!Object.keys(user).length) return null

    return (
      <Fragment>
        <Head>
          <title>{user.username}</title>
        </Head>
        <Container withYPadding>
          <div className="profile">
            <div className="profile__photo">
              <ProfilePhoto
                isMe={isMe}
                url={user.profileUrl}
                username={user.username}
              />
            </div>
            <div className="profile__user">{user.username}</div>
            <div className="profile__buttons">
              {isAuthenticated &&
                !isMe && <FollowButton username={user.username} />}
              {isMe && (
                <Route
                  children={({ match }) =>
                    !match && (
                      <Link to={`/${user.username}/settings`}>
                        <Icon name="settings" />
                      </Link>
                    )
                  }
                  path="/:username/settings"
                />
              )}
              {isMe && (
                <Button onClick={this.onLogOutClick} secondary>
                  Log Out
                </Button>
              )}
            </div>
          </div>
        </Container>
        <Switch>
          {isMe && <Route component={Settings} path="/:username/settings" />}
          <Route>
            <div className="profile-body">
              <div className="profile-body__tabs">
                {user.followers &&
                  user.following && (
                    <Stats
                      followers={user.followers.length}
                      following={user.following.length}
                      posts={user.posts}
                      username={user.username}
                    />
                  )}
              </div>
              <Container>
                <Switch>
                  <Route
                    component={() => <Posts timeline={user.username} />}
                    exact
                    path="/:username"
                  />
                  <Route
                    component={() => <UserList users={user.followers} />}
                    path="/:username/followers"
                  />
                  <Route
                    component={() => <UserList users={user.following} />}
                    path="/:username/following"
                  />
                  <Route
                    component={() => <Posts single={match.params.postId} />}
                    path="/:username/:postId"
                  />
                </Switch>
              </Container>
            </div>
          </Route>
        </Switch>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const me = getMe(state)
  const { username: userFromUrl } = ownProps.match.params

  return {
    isAuthenticated: isAuthenticated(state),
    isMe: me.username === userFromUrl,
    user: getUser(userFromUrl)(state)
  }
}

export default connect(mapStateToProps, {
  fetchUserByUsername,
  followUser,
  logOut,
  unfollowUser
})(Profile)
