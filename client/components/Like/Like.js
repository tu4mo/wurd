import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { isAuthenticated } from '~/selectors/auth'
import { likePost, unlikePost } from '~/actions/posts'
import Icon from '../Icon'
import './Like.scss'

class Like extends Component {
  static propTypes = {
    className: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    likePost: PropTypes.func.isRequired,
    liked: PropTypes.bool,
    likes: PropTypes.number,
    postId: PropTypes.string,
    unlikePost: PropTypes.func.isRequired
  }

  state = {
    didClickLike: false
  }

  onLikeClick = () => {
    const { postId } = this.props

    if (this.props.liked) {
      this.props.unlikePost(postId)
      this.setState({
        didClickLike: false
      })
    } else {
      this.props.likePost(postId)
      this.setState({
        didClickLike: true
      })
    }
  }

  render() {
    const { className, isAuthenticated, liked, likes } = this.props
    const { didClickLike } = this.state

    return (
      <div
        className={classnames(
          'like',
          { 'like--liked': didClickLike },
          className
        )}
      >
        <div className="like__count">
          {likes || 'No'} like{likes !== 1 && 's'}
        </div>
        {isAuthenticated &&
          <Icon
            className="like__icon"
            name={liked ? 'liked' : 'like'}
            onClick={this.onLikeClick}
          />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state)
})

export default connect(mapStateToProps, { likePost, unlikePost })(Like)
