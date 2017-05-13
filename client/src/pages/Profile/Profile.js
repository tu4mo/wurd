import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOut } from '../../actions/auth'
import { fetchPostsByUsername } from '../../actions/posts'
import { getUser } from '../../selectors/auth'
import api from '../../api'
import Button from '../../components/Button'
import Stats from '../../components/Stats'
import Posts from '../../components/Posts'
import './Profile.scss'

class Profile extends Component {
  static propTypes = {
    fetchPostsByUsername: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isMe: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
  }

  state = {
    user: {}
  }

  componentDidMount() {
    this.getUserForProfile(this.props.match.params.username)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.getUserForProfile(nextProps.match.params.username)
    }
  }

  getUserForProfile(username) {
    api('get', `users/${username}`)
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch(() => {
        this.props.history.push('/404')
      })

    this.props.fetchPostsByUsername(username)
  }

  onLogOutClick = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    const { user } = this.state
    const { isMe, posts } = this.props

    return (
      <div>
        <div className="container">
          <div className="profile">
            <img className="profile__photo" src="http://placehold.it/160x160" />
            <div className="profile__user">
              <div className="profile__name">{user.username}</div>
              <div className="profile__buttons">
                {!isMe && <Button>Follow</Button>}
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
  return {
    isMe: getUser(state).username === ownProps.match.params.username,
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchPostsByUsername, logOut })(Profile)
