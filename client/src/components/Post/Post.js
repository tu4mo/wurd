import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Post.scss'

class Post extends Component {
  static propTypes = {
    content: PropTypes.string
  }

  render () {
    const { content } = this.props

    return (
      <div className="post">
        <div className="post__header">
          <img className="post__profile" src="http://placehold.it/40x40" />
          <div className="post__user">tu4mo</div>
          <div className="post__time">5 minutes ago</div>
        </div>
        <div className="post__body">
          {content}
        </div>
        <div className="post__footer">
          5 likes
        </div>
      </div>
    )
  }
}

export default Post
