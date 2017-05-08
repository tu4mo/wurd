import React, { Component } from 'react'
import Button from '../../components/Button'
import Stats from '../../components/Stats'
import './Profile.scss'

class Profile extends Component {
  render () {
    return (
      <div className="profile-container">
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
      </div>
    )
  }
}

export default Profile
