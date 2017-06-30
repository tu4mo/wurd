import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPosts } from '~/actions/posts'
import { getFollowedPosts } from '~/selectors/posts'
import Posts from '~/components/Posts'
import './Home.scss'

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
      <div className="home">
        <div className="container">
          <div className="home__content">
            <Posts posts={posts} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: getFollowedPosts(state)
})

export default connect(mapStateToProps, { fetchPosts })(Home)
