import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getMe } from '../../selectors/users'
import Icon from '../Icon'
import NavItem from '../NavItem'
import ProfilePhoto from '../ProfilePhoto'
import styled from 'styled-components'
import { media } from '../../utils/style'

const ToolBar = ({ className, me }) =>
  me ? (
    <div className={className}>
      <NavItem to="/">
        <Icon name="home" />
      </NavItem>
      <NavItem to="/users">
        <Icon name="users" />
      </NavItem>
      <NavItem to={`/${me.username}`}>
        <ProfilePhoto size="tiny" url={me.profileUrl} username={me.username} />
      </NavItem>
    </div>
  ) : null

ToolBar.propTypes = {
  className: PropTypes.string,
  me: PropTypes.object
}

// prettier-ignore
const StyledBox = styled(ToolBar)`
  background-color: var(--header-background-color);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  bottom: 0;
  display: flex;
  left: 0;
  position: fixed;
  padding-bottom: env(safe-area-inset-bottom);
  right: 0;

  ${media.sm`
    display: none;
  `}

  & > * {
    flex-grow: 1;
    flex-basis: 0;
    height: var(--toolbar-height);
    justify-content: center;
  }
`

const mapStateToProps = state => ({
  me: getMe(state)
})

export default connect(mapStateToProps)(StyledBox)
