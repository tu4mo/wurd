import React, { Component } from 'react'
import Button from '../../components/Button'
import Stats from '../../components/Stats'
import Posts from '../../components/Posts'
import './Profile.scss'

const MOCK_POSTS = [
  { content: 'Lorem', user: 'tu4mo', timestamp: Date.now() - 1000000, gradientStart: '#84fab0', gradientEnd: '#8fd3f4' },
  { content: 'Consectetuer', user: 'tu4mo', timestamp: Date.now() - 200000000, gradientStart: '#fccb90', gradientEnd: '#d57eeb' }
]

class Profile extends Component {
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
                <Button>Log Out</Button>
              </div>
            </div>
            <div className="profile__stats">
              <Stats followers={51} following={24} posts={87} />
            </div>
          </div>
        </div>
        <div className="profile-posts">
          <div className="container">
            <Posts posts={MOCK_POSTS} />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
