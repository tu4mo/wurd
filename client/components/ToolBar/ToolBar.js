import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuthenticatedUser } from '~/selectors/users'
import NavItem from '../NavItem'
import ProfilePhoto from '../ProfilePhoto'
import './ToolBar.scss'

const ToolBar = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className="tool-bar">
      <NavItem to="/">Feed</NavItem>
      <NavItem to="/users">Users</NavItem>
      <NavItem to={`/${user.username}`}>
        <ProfilePhoto
          url={user.profileUrl}
          username={user.username}
          size="tiny"
        />
      </NavItem>
    </div>
  )
}

ToolBar.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => {
  return {
    user: getAuthenticatedUser(state)
  }
}

export default connect(mapStateToProps)(ToolBar)
