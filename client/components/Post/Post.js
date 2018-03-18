import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import time from '../../utils/time'

// Import components
import Button from '../Button'
import Icon from '../Icon'
import Like from '../Like'
import PostBody from '../PostBody'
import PostComment from '../PostComment'
import PostComments from '../PostComments'
import PostMenu from '../PostMenu'

// Import styles
import { StyledPost, StyledPlaceholder } from './styles'

class Post extends Component {
  static propTypes = {
    createComment: PropTypes.func.isRequired,
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
      return <StyledPlaceholder />
    }

    const {
      createComment,
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
      <StyledPost>
        <PostBody
          content={content}
          createdAt={time(createdAt)}
          createdAtDate={createdAt}
          gradientEnd={gradientEnd}
          gradientStart={gradientStart}
          id={id}
          profileUrl={profileUrl}
          username={username}
        />
        {comments.length > 0 && (
          <div className="comments">
            <PostComments comments={comments} />
          </div>
        )}
        <div className="footer">
          <PostComment
            className="comment"
            onSubmit={createComment}
            postId={id}
          />
          <Like className="like" liked={liked} likes={likes} postId={id} />
          <Button onClick={this.onMenuClick} textOnly>
            <Icon
              className={classnames('menu-toggle', {
                'menu-toggle--open': isMenuOpen
              })}
              name="menu"
            />
          </Button>
        </div>
        <PostMenu isOpen={isMenuOpen} postId={id} />
      </StyledPost>
    )
  }
}

export default Post
