import React from 'react'
import PropTypes from 'prop-types'
import './Stats.scss'

const Stats = ({ followers, following, posts }) => {
  return (
    <div className="stats">
      <div className="stat">
        <div className="stat__number">{posts}</div>
        <div className="stat__text">posts</div>
      </div>
      <div className="stat">
        <div className="stat__number">{followers}</div>
        <div className="stat__text">followers</div>
      </div>
      <div className="stat">
        <div className="stat__number">{following}</div>
        <div className="stat__text">following</div>
      </div>
    </div>
  )
}

Stats.propTypes = {
  followers: PropTypes.number,
  following: PropTypes.number,
  posts: PropTypes.number
}

Stats.defaultProps = {
  followers: 0,
  following: 0,
  posts: 0
}

export default Stats
