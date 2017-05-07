import React, { Component } from 'react'
import Button from '../../components/Button'
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
              <div className="stat">
                <div className="stat__number">51</div>
                <div className="stat__text">followers</div>
              </div>
              <div className="stat">
                <div className="stat__number">23</div>
                <div className="stat__text">following</div>
              </div>
              <div className="stat">
                <div className="stat__number">87</div>
                <div className="stat__text">posts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
