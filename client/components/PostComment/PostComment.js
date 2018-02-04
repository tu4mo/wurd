import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Input from '../Input'

const StyledForm = styled.form`
  width: 100%;
`

class PostComment extends Component {
  static propTypes = {
    className: PropTypes.string,
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
    const { className, postId } = this.props
    const { comment } = this.state

    return (
      <StyledForm className={className} onSubmit={this.onCommentSubmit}>
        <Input
          color="none"
          id={`input-comment-${postId}`}
          maxLength="500"
          name="username"
          onChange={this.onCommentChange}
          placeholder="Add a Comment…"
          value={comment}
        />
      </StyledForm>
    )
  }
}

export default PostComment
