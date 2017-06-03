import React from 'react'
import PropTypes from 'prop-types'
import './ProfilePhoto.scss'

const ProfilePhoto = ({ isMe, size, url, username }) => {
  const classNames = ['profile-photo']

  if (size) {
    classNames.push(`profile-photo--${size}`)
  }

  return (
    <div className={classNames.join(' ')}>
      <img
        alt={username}
        className="profile-photo__image"
        src={url}
        title={username}
      />
      {isMe &&
        <a
          className="profile-photo__change"
          href="https://www.gravatar.com"
          target="_blank"
        >
          Change Gravatar
        </a>}
    </div>
  )
}

ProfilePhoto.propTypes = {
  isMe: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'tiny']),
  url: PropTypes.string,
  username: PropTypes.string
}

export default ProfilePhoto
