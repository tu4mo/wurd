import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './Post.scss'

class Post extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    gradientEnd: PropTypes.string.isRequired,
    gradientStart: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired
  }

  componentDidMount () {
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
      if (this.content.offsetWidth > maxWidth || this.content.offsetHeight > maxHeight) {
        i--
        setFontSize(this.content, i)
        break
      } else {
        i++
        setFontSize(this.content, i)
      }
    }
  }

  render () {
    const { content, gradientEnd, gradientStart, timestamp, user } = this.props

    return (
      <div className="post">
        <div className="post__header">
          <img className="post__profile" src="http://placehold.it/40x40" />
          <div className="post__user">{user}</div>
          <div className="post__time">{moment(timestamp).fromNow()}</div>
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
            5 likes
          </div>
        </div>
      </div>
    )
  }
}

export default Post
