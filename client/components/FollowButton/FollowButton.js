import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isAuthenticated } from '~/selectors/auth'
import { followUser, unfollowUser } from '~/actions/users'
import { getMe, isFollowingUsername } from '~/selectors/users'
import Button from '../Button'

class FollowButton extends Component {
  static propTypes = {
    followUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFollowed: PropTypes.bool.isRequired,
    me: PropTypes.object.isRequired,
    unfollowUser: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
  }

  onFollowClick = () => {
    this.props.followUser(this.props.username)
  }

  onUnfollowClick = () => {
    this.props.unfollowUser(this.props.username)
  }

  render() {
    const { isAuthenticated, isFollowed, me, username } = this.props

    if (username === me.username || !isAuthenticated) {
      return null
    }

    return (
      <Button onClick={isFollowed ? this.onUnfollowClick : this.onFollowClick}>
        {isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: isAuthenticated(state),
  isFollowed: isFollowingUsername(ownProps.username)(state),
  me: getMe(state)
})

export default connect(mapStateToProps, { followUser, unfollowUser })(
  FollowButton
)
