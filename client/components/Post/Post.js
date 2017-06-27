import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Textfit } from 'react-textfit'
import Icon from '../Icon'
import Like from '../Like'
import PostMenu from '../PostMenu'
import ProfilePhoto from '../ProfilePhoto'
import './Post.scss'

class Post extends Component {
  static propTypes = {
    isPlaceholder: PropTypes.bool,
    post: PropTypes.object
  }

  state = {
    isMenuOpen: false
  }

  onMenuClick = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }))
  }

  render() {
    if (!this.props.post || this.props.isPlaceholder) {
      return (
        <div className="post post--placeholder">
          <div className="post__header" />
          <div className="post__body" />
          <div className="post__footer" />
        </div>
      )
    }

    const {
      post: {
        content,
        gradientEnd,
        gradientStart,
        createdAt,
        id,
        liked,
        likes,
        user: { username, profileUrl }
      }
    } = this.props

    const { isMenuOpen } = this.state

    const postTime =
      new Date(createdAt) < Date.now() - 1000 * 60 * 60 * 24
        ? moment(createdAt).format('LL')
        : moment(createdAt).fromNow()

    return (
      <div className="post">
        <div className="post__header">
          <Link className="post__profile" to={`/${username}`}>
            <ProfilePhoto size="small" url={profileUrl} />
          </Link>
          <Link className="post__user" to={`/${username}`}>
            {username}
          </Link>
          <Link className="post__time" to={`/${username}/${id}`}>
            {postTime}
          </Link>
        </div>
        <div
          className="post__body"
          style={{
            backgroundImage: `linear-gradient(45deg, ${gradientStart}, ${gradientEnd})`
          }}
        >
          <Textfit className="post__content" mode="single">
            {content}
          </Textfit>
        </div>
        <div className="post__footer">
          <Like liked={liked} likes={likes} postId={id} />
          <Icon
            className={`post__menu-toggle ${isMenuOpen
              ? 'post__menu-toggle--open'
              : ''}`}
            name="menu"
            onClick={this.onMenuClick}
          />
        </div>
        {isMenuOpen &&
          <div className="post__menu">
            <PostMenu postId={id} />
          </div>}
      </div>
    )
  }
}

export default Post
