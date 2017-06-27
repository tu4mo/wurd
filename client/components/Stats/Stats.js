import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './Stats.scss'

const Stats = ({ followers, following, posts, username }) => {
  return (
    <div className="stats">
      <NavLink
        activeClassName="stat--active"
        className="stat"
        exact
        to={`/${username}`}
      >
        <div className="stat__text">posts</div>
        <div className="stat__number">
          {posts}
        </div>
      </NavLink>
      <NavLink
        activeClassName="stat--active"
        className="stat"
        to={`/${username}/followers`}
      >
        <div className="stat__text">followers</div>
        <div className="stat__number">
          {followers}
        </div>
      </NavLink>
      <NavLink
        activeClassName="stat--active"
        className="stat"
        to={`/${username}/following`}
      >
        <div className="stat__text">following</div>
        <div className="stat__number">
          {following}
        </div>
      </NavLink>
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
