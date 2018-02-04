import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import {
  StyledPostBody,
  StyledPostHeader,
  StyledProfilePhoto,
  StyledPostContent
} from './styles'
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
    createdAt: PropTypes.string,
    fill: PropTypes.bool,
    gradientEnd: PropTypes.string,
    gradientStart: PropTypes.string,
    id: PropTypes.string,
    profileUrl: PropTypes.string,
    username: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.content !== this.props.content
  }

  render() {
    const {
      content,
      createdAt,
      fill,
      gradientEnd,
      gradientStart,
      id,
      profileUrl,
      username
    } = this.props

    return (
      <StyledPostBody
        fill={fill}
        gradientEnd={gradientEnd}
        gradientStart={gradientStart}
      >
        <StyledPostHeader>
          <Link className="profile" to={`/${username}`}>
            <StyledProfilePhoto size="small" url={profileUrl} />
          </Link>
          <Link className="user" to={`/${username}`}>
            {username}
          </Link>
          <Link className="time" to={`/${username}/${id}`}>
            {createdAt}
          </Link>
        </StyledPostHeader>
        <ContainerQuery query={query}>
          {params => (
            <StyledPostContent className={classNames(params)}>
              {content
                .split(' ')
                .map((word, i) => <PostWord key={i}>{word}</PostWord>)}
            </StyledPostContent>
          )}
        </ContainerQuery>
      </StyledPostBody>
    )
  }
}

export default PostBody
