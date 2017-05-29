import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Stats.scss'

const Stats = ({ followers, following, posts, username }) => {
  return (
    <div className="stats">
      <Link className="stat" to={`/${username}`}>
        <div className="stat__number">{posts}</div>
        <div className="stat__text">posts</div>
      </Link>
      <Link className="stat" to={`/${username}/followers`}>
        <div className="stat__number">{followers}</div>
        <div className="stat__text">followers</div>
      </Link>
      <Link className="stat" to={`/${username}/following`}>
        <div className="stat__number">{following}</div>
        <div className="stat__text">following</div>
      </Link>
    </div>
  )
}

Stats.propTypes = {
  followers: PropTypes.number,
  following: PropTypes.number,
  posts: PropTypes.number,
  username: PropTypes.string
}

Stats.defaultProps = {
  followers: 0,
  following: 0,
  posts: 0
}

export default Stats
