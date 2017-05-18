import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchHomePosts } from '../../actions/posts'
import { getPostsForHome } from '../../selectors/posts'
import Posts from '../../components/Posts'
import './Home.scss'

class Home extends Component {
  static propTypes = {
    fetchHomePosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchHomePosts()
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
  posts: getPostsForHome(state)
})

export default connect(mapStateToProps, { fetchHomePosts })(Home)
