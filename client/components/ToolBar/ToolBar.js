import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAuthenticatedUser } from '~/selectors/users'
import Icon from '../Icon'
import NavItem from '../NavItem'
import ProfilePhoto from '../ProfilePhoto'
import './ToolBar.scss'

const ToolBar = ({ user }) =>
  user
    ? <div className="tool-bar">
        <NavItem to="/">
          <Icon name="home" />
        </NavItem>
        <NavItem to="/users">
          <Icon name="users" />
        </NavItem>
        <NavItem to={`/${user.username}`}>
          <ProfilePhoto
            url={user.profileUrl}
            username={user.username}
            size="tiny"
          />
        </NavItem>
      </div>
    : null

ToolBar.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: getAuthenticatedUser(state)
})

export default connect(mapStateToProps)(ToolBar)
