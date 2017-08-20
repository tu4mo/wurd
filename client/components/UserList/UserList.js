import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FollowButton from '../FollowButton'
import { Table, Tr, Td } from '../Table'
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
    <Table className="user-list">
      {users.map(({ username, profileUrl }) =>
        <Tr key={username}>
          <Td>
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
          </Td>
          <Td style={{ textAlign: 'right', width: '1%' }}>
            <FollowButton username={username} />
          </Td>
        </Tr>
      )}
    </Table>
  )
}

UserList.propTypes = {
  isPending: PropTypes.bool,
  users: PropTypes.array
}

export default UserList
