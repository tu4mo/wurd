import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import actions
import { fetchPostById, fetchPosts } from '~/actions/posts'

// Import selectors
import { getPostIdsFromTimeline, getHasMore } from '~/selectors/timelines'

// Import components
import Button from '../Button'
import Post from '../Post'

// Import styles
import './Posts.scss'

class Posts extends Component {
  componentDidMount() {
    this.loadPosts()
  }

  componentWillReceiveProps(nextProps) {
    const { timeline, single } = this.props

    if (timeline !== nextProps.timeline || single !== nextProps.single) {
      this.loadPosts()
    }
  }

  loadPosts = () => {
    const { fetchPostById, fetchPosts, postIds, single, timeline } = this.props

    if (!single) {
      fetchPosts({
        after: postIds[0] || null,
        before: postIds[postIds.length - 1] || null,
        filter: timeline === 'home' ? 'following' : null,
        timeline,
        username: timeline === 'home' ? null : timeline
      })
    } else {
      fetchPostById(single)
    }
  }

  render() {
    const { hasMore, postIds } = this.props

    if (!postIds.length) {
      return (
        <div className="posts">
          <Post isPlaceholder />
          <Post isPlaceholder />
          <Post isPlaceholder />
          <Post isPlaceholder />
          <Post isPlaceholder />
        </div>
      )
    }

    return (
      <div className="posts">
        {postIds.map(id => <Post postId={id} key={id} />)}
        {hasMore && <Button onClick={this.loadPosts}>More</Button>}
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPostById: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  hasMore: PropTypes.bool,
  postIds: PropTypes.array,
  single: PropTypes.string,
  timeline: PropTypes.string
}

Posts.defaultProps = {
  posts: {}
}

const mapStateToProps = (state, ownProps) => {
  const { timeline, single } = ownProps

  const postIds = single ? [single] : getPostIdsFromTimeline(state, timeline)

  return {
    hasMore: getHasMore(state, timeline),
    postIds
  }
}

export default connect(mapStateToProps, {
  fetchPostById,
  fetchPosts
})(Posts)
