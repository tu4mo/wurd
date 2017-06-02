import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Tr, Td } from '../Table'
import ProfilePhoto from '../ProfilePhoto'
import './UserList.scss'

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return null
  }

  return (
    <Table className="user-list">
      {users.map(({ username, profileUrl }) =>
        <Tr>
          <Td>
            <Link to={`/${username}`}>
              <ProfilePhoto size="small" url={profileUrl} username={username} />
            </Link>
            <Link className="user-list__username" to={`/${username}`}>
              {username}
            </Link>
          </Td>
          <Td style={{ width: '1%' }}>
            {/* Button */}
          </Td>
        </Tr>
      )}
    </Table>
  )
}

UserList.propTypes = {
  users: PropTypes.array
}

export default UserList
