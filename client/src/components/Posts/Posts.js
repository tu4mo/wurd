import React from 'react'
import PropTypes from 'prop-types'
import Post from '../Post'
import './Posts.scss'

const Posts = ({ posts }) => {
  if (!Object.keys(posts).length) {
    return (
      <div className="posts">
        <Post isPlaceholder />
        <Post isPlaceholder />
        <Post isPlaceholder />
        <Post isPlaceholder />
        <Post isPlaceholder />
      </div>
    )
  }

  return (
    <div className="posts">
      {Object.keys(posts).map(key => {
        const post = posts[key]

        return (
          <Post
            content={post.content}
            createdAt={post.createdAt}
            gradientStart={post.gradientStart}
            gradientEnd={post.gradientEnd}
            id={post.id}
            key={key}
            liked={post.liked}
            likes={post.likes}
            profileUrl={post.user.profileUrl}
            username={post.user ? post.user.username : null}
          />
        )
      })}
    </div>
  )
}

Posts.propTypes = {
  posts: PropTypes.object
}

Posts.defaultProps = {
  posts: {}
}

export default Posts
