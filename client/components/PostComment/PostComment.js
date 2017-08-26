import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createComment } from '~/actions/posts'
import Input from '../Input'

class PostComment extends Component {
  static propTypes = {
    createComment: PropTypes.func.isRequired,
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

    const { createComment, postId } = this.props

    createComment(postId, this.state.comment)

    this.setState({ comment: '' })
  }

  render() {
    const { comment } = this.state

    return (
      <form className="post__comment" onSubmit={this.onCommentSubmit}>
        <Input
          color="none"
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

export default connect(null, { createComment })(PostComment)
