import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Post.scss'

class Post extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    gradientEnd: PropTypes.string.isRequired,
    gradientStart: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }

  componentDidMount() {
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
      created,
      likes,
      username
    } = this.props

    return (
      <div className="post">
        <div className="post__header">
          <Link className="post__profile" to={`/${username}`}>
            <img
              alt={username}
              src="http://placehold.it/40x40"
              title={username}
            />
          </Link>
          <Link className="post__user" to={`/${username}`}>
            {username}
          </Link>
          <div className="post__time">{moment(created).fromNow()}</div>
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
          <div className="post__likes">
            {likes} likes
          </div>
        </div>
      </div>
    )
  }
}

export default Post
