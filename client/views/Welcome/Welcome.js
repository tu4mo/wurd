import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchPosts } from '../../actions/posts'
import { getAllPosts } from '../../selectors/posts'

// Import components
import Head from '../../components/Head'
import PostBody from '../../components/PostBody'
import SignInUp from '../../components/SignInUp'

import './Welcome.scss'

const POSTS = 36

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getRandomPost = posts => {
  const keys = Object.keys(posts)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return randomNumber(1, 5) > 2 ? posts[randomKey] : null
}

const getRandomPosts = posts =>
  [...new Array(POSTS)].map(() => {
    return getRandomPost(posts)
  })

class Welcome extends Component {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.object
  }

  state = {
    animate: false,
    randomPosts: []
  }

  componentDidMount() {
    this.props.fetchPosts({ limit: 100 })
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.posts).length) {
      this.setState(
        {
          randomPosts: getRandomPosts(nextProps.posts)
        },
        () => {
          this.animationTimer = setInterval(this.randomizePost, 500)
        }
      )
    }
  }

  componentWillUnmount() {
    if (this.animationTimer) clearInterval(this.animationTimer)
  }

  animationTimer = null

  randomizePost = () => {
    this.setState(prevState => ({
      randomPosts: Object.assign([], prevState.randomPosts, {
        [randomNumber(0, POSTS - 1)]: getRandomPost(this.props.posts)
      })
    }))
  }

  renderPosts = () => {
    return this.state.randomPosts.map((post, i) => (
      <div className="welcome__item" key={i}>
        <div className="welcome__post">
          {post && (
            <PostBody
              content={post.content}
              fill
              gradientEnd={post.gradientEnd}
              gradientStart={post.gradientStart}
            />
          )}
        </div>
        <div className="welcome__post-background" />
      </div>
    ))
  }

  render() {
    return (
      <Fragment>
        <Head />
        <div className="welcome">
          <div className="welcome__content">{this.renderPosts()}</div>
        </div>
        <div className="welcome-form">
          <SignInUp />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: getAllPosts(state)
})

export default connect(mapStateToProps, { fetchPosts })(Welcome)
