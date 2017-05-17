import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOut } from '../../actions/auth'
import { fetchUserByUsername } from '../../actions/users'
import { fetchPostsByUsername } from '../../actions/posts'
import { getAuthenticatedUser, isAuthenticated } from '../../selectors/auth'
import { getUser } from '../../selectors/users'
import Button from '../../components/Button'
import Posts from '../../components/Posts'
import ProfilePhoto from '../../components/ProfilePhoto'
import Stats from '../../components/Stats'
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

  onLogOutClick = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    const { isAuthenticated, isMe, posts, user } = this.props

    return (
      <div>
        <div className="container">
          <div className="profile">
            <ProfilePhoto username={user.username} />
            <div className="profile__user">
              <div className="profile__name">{user.username}</div>
              <div className="profile__buttons">
                {isAuthenticated && !isMe && <Button>Follow</Button>}
                {isMe && <Button onClick={this.onLogOutClick}>Log Out</Button>}
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
        <div className="profile-posts">
          <div className="container">
            <Posts posts={posts[user.username]} />
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
    posts: state.posts,
    user: getUser(userFromUrl)(state) || {}
  }
}

export default connect(mapStateToProps, {
  fetchPostsByUsername,
  fetchUserByUsername,
  logOut
})(Profile)
