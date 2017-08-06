import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import moment from 'moment'
import Icon from '../Icon'
import Like from '../Like'
import PostBody from '../PostBody'
import PostMenu from '../PostMenu'
import ProfilePhoto from '../ProfilePhoto'
import './Post.scss'

const placeholderStyles = {
  header: { height: '40px' },
  body: { paddingTop: '40%' },
  footer: { height: '24px' }
}

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
          <div className="post__header">
            <div style={placeholderStyles.header} />
          </div>
          <div style={placeholderStyles.body} />
          <div className="post__footer">
            <div style={placeholderStyles.footer} />
          </div>
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
        <PostBody
          content={content}
          gradientStart={gradientStart}
          gradientEnd={gradientEnd}
        />
        <div className="post__footer">
          <Like liked={liked} likes={likes} postId={id} />
          <Icon
            className={classnames('post__menu-toggle', {
              'post__menu-toggle--open': isMenuOpen
            })}
            name="menu"
            onClick={this.onMenuClick}
          />
        </div>
        <PostMenu isOpen={isMenuOpen} postId={id} />
      </div>
    )
  }
}

export default Post
