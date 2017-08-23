import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import actions
import { fetchPostById, fetchPosts } from '~/actions/posts'

// Import selectors
import { getPostIdsFromTimeline, getHasMore } from '~/selectors/timelines'

// Import components
import Post from '../Post'

// Import styles
import './Posts.scss'

class Posts extends Component {
  componentDidMount() {
    this._fetchPosts()
  }

  componentWillReceiveProps(nextProps) {
    const { from, single } = this.props

    if (from !== nextProps.from || single !== nextProps.single) {
      this._fetchPosts()
    }
  }

  _fetchPosts() {
    const { fetchPostById, fetchPosts, from, single } = this.props

    if (from === 'home') {
      fetchPosts({
        filter: 'following',
        timeline: 'home'
      })
    } else if (single) {
      fetchPostById(single)
    } else {
      fetchPosts({
        timeline: from,
        username: from
      })
    }
  }

  loadMore = () => {}

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
        {hasMore && <div onClick={this.loadMore}>More</div>}
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPostById: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired,
  hasMore: PropTypes.bool,
  postIds: PropTypes.array,
  single: PropTypes.string
}

Posts.defaultProps = {
  posts: {}
}

const mapStateToProps = (state, ownProps) => {
  const { from, single } = ownProps

  const postIds = single ? [single] : getPostIdsFromTimeline(state, from)

  return {
    hasMore: getHasMore(state, from),
    postIds
  }
}

export default connect(mapStateToProps, {
  fetchPostById,
  fetchPosts
})(Posts)
