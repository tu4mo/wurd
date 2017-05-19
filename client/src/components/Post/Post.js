import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import FitText from '../FitText'
import Like from '../Like'
import ProfilePhoto from '../ProfilePhoto'
import './Post.scss'

class Post extends Component {
  state = {
    resizeDone: false
  }

  static propTypes = {
    content: PropTypes.string,
    createdAt: PropTypes.string,
    gradientEnd: PropTypes.string,
    gradientStart: PropTypes.string,
    id: PropTypes.number,
    isPlaceholder: PropTypes.bool,
    liked: PropTypes.bool,
    likes: PropTypes.number,
    username: PropTypes.string
  }

  onContentResized = () => {
    this.setState({
      resizeDone: true
    })
  }

  render() {
    const {
      content,
      gradientEnd,
      gradientStart,
      createdAt,
      id,
      isPlaceholder,
      liked,
      likes,
      username
    } = this.props

    const classNames = ['post']

    if (isPlaceholder) {
      classNames.push('post--placeholder')
    }

    if (this.state.resizeDone) {
      classNames.push('post--ready')
    }

    return (
      <div className={classNames.join(' ')}>
        <div className="post__header">
          <Link className="post__profile" to={`/${username}`}>
            <ProfilePhoto size="small" />
          </Link>
          <Link className="post__user" to={`/${username}`}>
            {username}
          </Link>
          <div className="post__time">{moment(createdAt).fromNow()}</div>
        </div>
        <div
          className="post__body"
          style={{
            backgroundImage: `linear-gradient(45deg, ${gradientStart}, ${gradientEnd})`
          }}
        >
          <FitText className="post__content" onResized={this.onContentResized}>
            {content}
          </FitText>
        </div>
        <div className="post__footer">
          <Like liked={liked} likes={likes} postId={id} />
        </div>
      </div>
    )
  }
}

export default Post
