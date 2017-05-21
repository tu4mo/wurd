import React from 'react'
import PropTypes from 'prop-types'
import profile from '../../assets/profile.png'
import './ProfilePhoto.scss'

const ProfilePhoto = ({ onUpload, size, url, username }) => {
  const classNames = ['profile-photo']

  if (size === 'small') {
    classNames.push('profile-photo--small')
  }

  return (
    <div className={classNames.join(' ')}>
      <img
        alt={username}
        className="profile-photo__image"
        src={url}
        title={username}
      />
      {onUpload &&
        <div className="profile-photo__upload">
          Upload Photo
          <input
            accept=".gif,.jpg,.png"
            className="profile-photo__file-input"
            onChange={onUpload}
            type="file"
          />
        </div>}
    </div>
  )
}

ProfilePhoto.propTypes = {
  onUpload: PropTypes.func,
  size: PropTypes.oneOf(['small']),
  url: PropTypes.string,
  username: PropTypes.string
}

ProfilePhoto.defaultProps = {
  url: profile
}

export default ProfilePhoto
