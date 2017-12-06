import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledComment = styled.div`
  &:not(:last-child) {
    margin-bottom: var(--spacing-xs);
  }
`

const StyledLink = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  margin-right: var(--spacing-xs);
`

const StyledContent = styled.span`
  color: var(--color-gray);
`

const PostComments = ({ comments }) =>
  comments.map(comment => (
    <StyledComment key={comment.id}>
      <StyledLink to={`/${comment.user.username}`}>
        {comment.user.username}
      </StyledLink>
      <StyledContent>{comment.content}</StyledContent>
    </StyledComment>
  ))

PostComments.propTypes = {
  comments: PropTypes.array
}

export default PostComments
