import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logOut } from '../../actions/auth'
import { getPosts } from '../../actions/posts'
import Button from '../../components/Button'
import Stats from '../../components/Stats'
import Posts from '../../components/Posts'
import './Profile.scss'

class Profile extends Component {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    logOut: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
  }

  componentDidMount () {
    this.props.getPosts()
  }

  onLogOutClick = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render () {
    return (
      <div>
        <div className="container">
          <div className="profile">
            <img className="profile__photo" src="http://placehold.it/160x160" />
            <div className="profile__user">
              <div className="profile__name">tu4mo</div>
              <div className="profile__buttons">
                <Button>Follow</Button>
                <Button onClick={this.onLogOutClick}>Log Out</Button>
              </div>
            </div>
            <div className="profile__stats">
              <Stats followers={51} following={24} posts={87} />
            </div>
          </div>
        </div>
        <div className="profile-posts">
          <div className="container">
            <Posts posts={this.props.posts} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { getPosts, logOut })(Profile)
