import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deletePost } from '~/actions/posts'
import { isPostMine } from '~/selectors/posts'
import Button from '../Button'
import './PostMenu.scss'

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
      <div className={`post-menu ${isOpen ? 'post-menu--active' : ''}`}>
        <div className="post-menu__content">
          <Button className="post-menu__button" disabled link>
            Share
          </Button>
          {isMine &&
            <Button
              className="post-menu__button"
              link
              onClick={this.onDeleteClick}
            >
              Delete
            </Button>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isMine: isPostMine(ownProps.postId)(state)
})

export default connect(mapStateToProps, { deletePost })(PostMenu)
