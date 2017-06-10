import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../actions/posts'
import Icon from '../Icon'
import './Like.scss'

class Like extends Component {
  static propTypes = {
    liked: PropTypes.bool,
    likes: PropTypes.number,
    likePost: PropTypes.func.isRequired,
    postId: PropTypes.string,
    unlikePost: PropTypes.func.isRequired
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
        <Icon
          className="like__icon"
          name={liked ? 'liked' : 'like'}
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
