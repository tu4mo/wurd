import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { followUser, unfollowUser } from '../../actions/users'
import {
  getAuthenticatedUser,
  isFollowingUsername
} from '../../selectors/users'
import Button from '../Button'

class FollowButton extends Component {
  onFollowClick = () => {
    this.props.followUser(this.props.username)
  }

  onUnfollowClick = () => {
    this.props.unfollowUser(this.props.username)
  }

  render() {
    const { isFollowed } = this.props

    if (this.props.username === this.props.authenticatedUser.username) {
      return null
    }

    return (
      <Button onClick={isFollowed ? this.onUnfollowClick : this.onFollowClick}>
        {isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    )
  }
}

FollowButton.propTypes = {
  authenticatedUser: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  isFollowed: PropTypes.bool.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  authenticatedUser: getAuthenticatedUser(state),
  isFollowed: isFollowingUsername(ownProps.username)(state)
})

export default connect(mapStateToProps, { followUser, unfollowUser })(
  FollowButton
)
