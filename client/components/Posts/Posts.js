import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import actions
import { setPage } from '~/actions/pagination'
import {
  fetchPosts,
  fetchPostById,
  fetchPostsByUsername
} from '~/actions/posts'

// Import selectors
import { getPage } from '~/selectors/pagination'
import {
  getFollowedPosts,
  getPostById,
  getPostsByUsername
} from '~/selectors/posts'
import { getAuthenticatedUser } from '~/selectors/users'

// Import components
import Post from '../Post'

// Import styles
import './Posts.scss'

class Posts extends Component {
  componentDidMount() {
    this._fetch()
  }

  componentWillReceiveProps(nextProps) {
    const { from, single } = this.props

    if (from !== nextProps.from || single !== nextProps.single) {
      this._fetch()
    }
  }

  _fetch() {
    const {
      fetchPostById,
      fetchPosts,
      fetchPostsByUsername,
      from,
      page,
      setPage,
      single
    } = this.props

    setPage(from, 0)

    if (from === 'home') {
      fetchPosts({ filter: 'following', limit: 10, page })
    } else if (single) {
      fetchPostById(single)
    } else {
      fetchPostsByUsername(from)
    }
  }

  render() {
    const { posts } = this.props

    if (!Object.keys(posts).length) {
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
        {Object.keys(posts).map(key => {
          const post = posts[key]
          return <Post post={post} key={key} />
        })}
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPostById: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchPostsByUsername: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  page: PropTypes.number.isRequired,
  posts: PropTypes.object,
  setPage: PropTypes.func.isRequired,
  single: PropTypes.string
}

Posts.defaultProps = {
  posts: {}
}

const mapStateToProps = (state, ownProps) => {
  const { from, single } = ownProps

  const user = getAuthenticatedUser(state)

  const posts =
    from === 'home'
      ? getFollowedPosts(state, user)
      : single
        ? { [single]: getPostById(single)(state) }
        : getPostsByUsername(from)(state)

  return {
    page: getPage(state, from),
    posts
  }
}

export default connect(mapStateToProps, {
  fetchPostById,
  fetchPosts,
  fetchPostsByUsername,
  setPage
})(Posts)
