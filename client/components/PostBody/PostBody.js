import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StyledPostBody, StyledPostContent, StyledWord } from './styles'

class PostBody extends Component {
  static propTypes = {
    content: PropTypes.string,
    fill: PropTypes.bool,
    gradientEnd: PropTypes.string,
    gradientStart: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.content === this.props.content) {
      return false
    }
  }

  render() {
    const { content, fill, gradientEnd, gradientStart } = this.props

    return (
      <StyledPostBody
        fill={fill}
        gradientEnd={gradientEnd}
        gradientStart={gradientStart}
      >
        <StyledPostContent>
          {content.split(' ').map((word, i) => (
            <StyledWord
              key={i}
              style={{
                transform: `rotate(${Math.floor(Math.random() * 10 + -5)}deg`
              }}
            >
              {word}
            </StyledWord>
          ))}
        </StyledPostContent>
      </StyledPostBody>
    )
  }
}

export default PostBody
