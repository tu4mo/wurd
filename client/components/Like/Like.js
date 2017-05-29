import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../actions/posts'
import './Like.scss'

class Like extends Component {
  static propTypes = {
    liked: PropTypes.bool,
    likes: PropTypes.number,
    likePost: PropTypes.object.isRequired,
    postId: PropTypes.number,
    unlikePost: PropTypes.func
  }

  onLikeClick = () => {
    if (this.props.liked) {
      this.props.unlikePost(this.props.postId)
    } else {
      this.props.likePost(this.props.postId)
    }
  }

  render() {
    const { liked, likes } = this.props

    return (
      <div className={`like ${liked ? 'like--liked' : ''}`}>
        <div
          className="like__icon"
          onClick={this.onLikeClick}
          title={`Like${liked ? 'd' : ''}`}
        />
        <div className="like__count">
          {likes} like{likes !== 1 && 's'}
        </div>
      </div>
    )
  }
}

export default connect(null, { likePost, unlikePost })(Like)
