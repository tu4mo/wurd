import React from 'react'
import PropTypes from 'prop-types'
import profile from '../../assets/profile.png'

import './ProfilePhoto.scss'

const ProfilePhoto = ({ size, url, username }) => {
  const classNames = ['profile-photo']

  if (size === 'small') {
    classNames.push('profile-photo--small')
  }

  return (
    <img
      alt={username}
      className={classNames.join(' ')}
      src={url}
      title={username}
    />
  )
}

ProfilePhoto.propTypes = {
  size: PropTypes.oneOf(['small']),
  url: PropTypes.string,
  username: PropTypes.string
}

ProfilePhoto.defaultProps = {
  url: profile
}

export default ProfilePhoto
