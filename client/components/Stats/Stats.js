import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './Stats.scss'

const StatLink = ({ number, text, ...props }) => (
  <NavLink activeClassName="stat--active" className="stat" {...props}>
    <div className="stat__text">{text}</div>
    <div className="stat__number">{number}</div>
  </NavLink>
)

StatLink.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
}

const Stats = ({ followers, following, likes, posts, username }) => (
  <div className="stats">
    <StatLink exact number={posts} text="Posts" to={`/${username}`} />
    <StatLink
      number={followers}
      text="Followers"
      to={`/${username}/followers`}
    />
    <StatLink
      number={following}
      text="Following"
      to={`/${username}/following`}
    />
  </div>
)

Stats.propTypes = {
  followers: PropTypes.number,
  following: PropTypes.number,
  likes: PropTypes.number,
  posts: PropTypes.number,
  username: PropTypes.string
}

Stats.defaultProps = {
  followers: 0,
  following: 0,
  likes: 0,
  posts: 0
}

export default Stats
