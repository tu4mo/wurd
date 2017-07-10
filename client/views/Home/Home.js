import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts } from '~/actions/posts'
import { getAuthenticatedUser } from '~/selectors/users'
import { getFollowedPosts } from '~/selectors/posts'
import Posts from '~/components/Posts'

class Home extends Component {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchPosts({ filter: 'following' })
  }

  render() {
    const { posts } = this.props

    return (
      <div className="container container--with-y-padding">
        <Posts posts={posts} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const user = getAuthenticatedUser(state)

  return {
    posts: getFollowedPosts(state, user)
  }
}

export default connect(mapStateToProps, { fetchPosts })(Home)
