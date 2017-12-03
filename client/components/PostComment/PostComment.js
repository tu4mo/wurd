import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'

class PostComment extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
  }

  state = {
    comment: ''
  }

  onCommentChange = e => {
    this.setState({ comment: e.target.value })
  }

  onCommentSubmit = e => {
    e.preventDefault()

    const { onSubmit, postId } = this.props

    onSubmit(postId, this.state.comment)

    this.setState({ comment: '' })
  }

  render() {
    const { postId } = this.props
    const { comment } = this.state

    return (
      <form className="post__comment" onSubmit={this.onCommentSubmit}>
        <Input
          color="none"
          id={`input-comment-${postId}`}
          maxLength="500"
          name="username"
          onChange={this.onCommentChange}
          placeholder="Add a Comment…"
          value={comment}
        />
      </form>
    )
  }
}

export default PostComment
