import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { deletePost } from '~/actions/posts'
import { isPostByUser } from '~/selectors/posts'
import { getMe } from '~/selectors/users'

import Button from '../Button'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-height: ${props => (props.isOpen ? '100px' : '0')};
  overflow: hidden;
  position: relative;
  transition: max-height 0.5s ease-in-out;

  &:before {
    border-top: 1px solid var(--color-ultra-light-gray);
    content: '';
    display: block;
    position: absolute;
    width: 100%;
  }
`

class PostMenu extends Component {
  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    isMine: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool,
    postId: PropTypes.string.isRequired
  }

  onDeleteClick = () => {
    this.props.deletePost(this.props.postId)
  }

  render() {
    const { isMine, isOpen } = this.props

    return (
      <Wrapper isOpen={isOpen}>
        <Button disabled link>
          Share
        </Button>
        {isMine && (
          <Button link onClick={this.onDeleteClick}>
            Delete
          </Button>
        )}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const me = getMe(state)

  return {
    isMine: isPostByUser(state, ownProps.postId, me.username)
  }
}

export default connect(mapStateToProps, { deletePost })(PostMenu)
