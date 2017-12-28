import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'

import { StyledPostBody, StyledPostContent } from './styles'
import PostWord from '../PostWord'

const query = {
  'post-body-lg': {
    minWidth: 500
  },
  'post-body-md': {
    maxWidth: 499,
    minWidth: 300
  }
}

class PostBody extends Component {
  static propTypes = {
    content: PropTypes.string,
    fill: PropTypes.bool,
    gradientEnd: PropTypes.string,
    gradientStart: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.content !== this.props.content
  }

  render() {
    const { content, fill, gradientEnd, gradientStart } = this.props

    return (
      <StyledPostBody
        fill={fill}
        gradientEnd={gradientEnd}
        gradientStart={gradientStart}
      >
        <ContainerQuery query={query}>
          {params => (
            <StyledPostContent className={classNames(params)}>
              {content.split(' ').map((word, i) => (
                <PostWord
                  key={i}
                  style={{
                    transform: `rotate(${Math.floor(
                      Math.random() * 10 + -5
                    )}deg`
                  }}
                >
                  {word}
                </PostWord>
              ))}
            </StyledPostContent>
          )}
        </ContainerQuery>
      </StyledPostBody>
    )
  }
}

export default PostBody
