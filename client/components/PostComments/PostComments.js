import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './PostComments.scss'

const PostComments = ({ comments }) => (
  <div className="post-comments">
    {comments.map(comment => (
      <div className="post-comments__comment" key={comment.id}>
        <Link
          className="post-comments__username"
          to={`/${comment.user.username}`}
        >
          {comment.user.username}
        </Link>{' '}
        <span className="post-comments__content">{comment.content}</span>
      </div>
    ))}
  </div>
)

PostComments.propTypes = {
  comments: PropTypes.array
}

export default PostComments
