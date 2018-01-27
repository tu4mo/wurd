import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

// Import actions
import { fetchPostById, fetchPosts } from '../../ducks/posts'

// Import selectors
import { getHasMore, getPostIdsFromTimeline } from '../../selectors/timelines'

// Import components
import Button from '../Button'
import Post from '../Post'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

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
        <Wrapper>
          <Post isPlaceholder />
          <Post isPlaceholder />
          <Post isPlaceholder />
          <Post isPlaceholder />
          <Post isPlaceholder />
        </Wrapper>
      )
    }

    return (
      <Wrapper>
        {postIds.map(id => <Post key={id} postId={id} />)}
        {hasMore && <Button onClick={this.loadPosts}>More</Button>}
      </Wrapper>
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
