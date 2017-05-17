import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Like from '../Like'
import ProfilePhoto from '../ProfilePhoto'
import './Post.scss'

class Post extends Component {
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

  componentDidMount() {
    this.resizeContent()
  }

  resizeContent() {
    if (!this.props.content) return

    const parentStyle = getComputedStyle(this.parent)
    const parentPaddingX =
      parseInt(parentStyle.getPropertyValue('padding-left')) +
      parseInt(parentStyle.getPropertyValue('padding-right'))
    const parentPaddingY =
      parseInt(parentStyle.getPropertyValue('padding-bottom')) +
      parseInt(parentStyle.getPropertyValue('padding-top'))
    const maxWidth = this.parent.offsetWidth - parentPaddingX
    const maxHeight = this.parent.offsetHeight - parentPaddingY

    const setFontSize = (element, size) => {
      element.style.fontSize = `${size}px`
    }

    let i = 1

    while (true) {
      if (
        this.content.offsetWidth > maxWidth ||
        this.content.offsetHeight > maxHeight
      ) {
        i--
        setFontSize(this.content, i)
        break
      } else {
        i++
        setFontSize(this.content, i)
      }
    }
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

    return (
      <div className={`post ${isPlaceholder ? 'post--placeholder' : ''}`}>
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
          ref={ref => (this.parent = ref)}
        >
          <span className="post__content" ref={ref => (this.content = ref)}>
            {content}
          </span>
        </div>
        <div className="post__footer">
          <Like liked={liked} likes={likes} postId={id} />
        </div>
      </div>
    )
  }
}

export default Post
