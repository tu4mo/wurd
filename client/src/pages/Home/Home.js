import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isAuthenticated } from '../../selectors/auth'
import api from '../../api'
import Welcome from '../../partials/Welcome'
import Posts from '../../components/Posts'
import './Home.scss'

class Home extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  state = {
    posts: []
  }

  componentDidMount() {
    api('get', 'posts').then(response => {
      this.setState({ posts: response.data })
    })
  }

  render() {
    const { isAuthenticated } = this.props
    const { posts } = this.state

    if (!posts.length) {
      return null
    }

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
  isAuthenticated: isAuthenticated(state)
})

export default connect(mapStateToProps)(Home)
