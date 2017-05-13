import React from 'react'
import PropTypes from 'prop-types'
import Post from '../Post'
import './Posts.scss'

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post, i) => (
        <Post
          content={post.content}
          created={post.created}
          gradientStart={post.gradientStart}
          gradientEnd={post.gradientEnd}
          key={i}
          likes={post.likes}
          username={post.user.username}
        />
      ))}
    </div>
  )
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string
    })
  )
}

Posts.defaultProps = {
  posts: []
}

export default Posts
