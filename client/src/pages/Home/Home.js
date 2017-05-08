import React, { Component } from 'react'
import Posts from '../../components/Posts'
import './Home.scss'

const MOCK_POSTS = [
  { content: 'Lorem', user: 'tu4mo', timestamp: Date.now() - 1000000, gradientStart: '#84fab0', gradientEnd: '#8fd3f4' },
  { content: 'Consectetuer', user: 'johndoe', timestamp: Date.now() - 200000000, gradientStart: '#fccb90', gradientEnd: '#d57eeb' }
]

class Home extends Component {
  render () {
    return (
      <div className="container">
        <div className="home">
          <Posts posts={MOCK_POSTS} />
        </div>
      </div>
    )
  }
}

export default Home
