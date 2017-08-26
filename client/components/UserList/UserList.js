import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FollowButton from '../FollowButton'
import { Box, BoxSection } from '../Box'
import ProfilePhoto from '../ProfilePhoto'
import Spinner from '../Spinner'
import './UserList.scss'

const UserList = ({ isPending, users }) => {
  if (isPending) {
    return <Spinner />
  }

  if (!users || users.length === 0) {
    return null
  }

  return (
    <Box className="user-list">
      {users.map(({ username, profileUrl }) => (
        <BoxSection hasPadding key={username}>
          <div className="user-list__row">
            <div className="user-list__user">
              <Link to={`/${username}`}>
                <ProfilePhoto
                  size="small"
                  url={profileUrl}
                  username={username}
                />
              </Link>
              <Link className="user-list__username" to={`/${username}`}>
                {username}
              </Link>
            </div>
            <FollowButton username={username} />
          </div>
        </BoxSection>
      ))}
    </Box>
  )
}

UserList.propTypes = {
  isPending: PropTypes.bool,
  users: PropTypes.array
}

export default UserList
