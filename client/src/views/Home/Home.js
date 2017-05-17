import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchHomePosts } from '../../actions/posts'
import { isAuthenticated } from '../../selectors/auth'
import { getPostsForHome } from '../../selectors/posts'
import Welcome from '../../components/Welcome'
import Posts from '../../components/Posts'
import './Home.scss'

class Home extends Component {
  static propTypes = {
    fetchHomePosts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    posts: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchHomePosts()
  }

  render() {
    const { isAuthenticated, posts } = this.props

    return (
      <div className="home">
        {!isAuthenticated && <Welcome />}
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
  isAuthenticated: isAuthenticated(state),
  posts: getPostsForHome(state)
})

export default connect(mapStateToProps, { fetchHomePosts })(Home)
