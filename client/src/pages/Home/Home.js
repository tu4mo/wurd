import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isAuthenticated } from '../../selectors/auth'
import Welcome from '../../partials/Welcome'
import Posts from '../../components/Posts'
import './Home.scss'

const MOCK_POSTS = [
  { content: 'Lorem', user: 'tu4mo', timestamp: Date.now() - 1000000, gradientStart: '#84fab0', gradientEnd: '#8fd3f4' },
  { content: 'Consectetuer', user: 'johndoe', timestamp: Date.now() - 200000000, gradientStart: '#fccb90', gradientEnd: '#d57eeb' }
]

class Home extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  render () {
    const { isAuthenticated } = this.props
    return (
      <div className="home">
        {!isAuthenticated && <Welcome />}
        <div className="container">
          <div className="home__content">
            <Posts posts={MOCK_POSTS} />
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
