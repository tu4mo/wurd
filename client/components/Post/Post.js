import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import time from '~/utils/time'

// Import selectors
import { getPostById } from '~/selectors/posts'

// Import components
import Icon from '../Icon'
import Like from '../Like'
import PostBody from '../PostBody'
import PostComment from '../PostComment'
import PostComments from '../PostComments'
import PostMenu from '../PostMenu'
import ProfilePhoto from '../ProfilePhoto'

// Import styles
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
        comments,
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
            {time(createdAt)}
          </Link>
        </div>
        <PostBody
          content={content}
          gradientStart={gradientStart}
          gradientEnd={gradientEnd}
        />
        {comments.length > 0 &&
          <div className="post__comments">
            <PostComments comments={comments} />
          </div>}
        <div className="post__footer">
          <PostComment postId={id} />
          <Like
            className="post__like"
            liked={liked}
            likes={likes}
            postId={id}
          />
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

const mapStateToProps = (state, ownProps) => ({
  post: getPostById(ownProps.postId)(state)
})

export default connect(mapStateToProps)(Post)
