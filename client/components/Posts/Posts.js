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
        return <Post post={post} key={key} />
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
