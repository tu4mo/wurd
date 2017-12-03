import Header from './Header'

import { connect } from 'react-redux'
import { fetchUserByUsername } from '~/actions/users'
import { createPost } from '~/actions/posts'
import { getMe } from '~/selectors/users'
import { isAuthenticated } from '~/selectors/auth'

const mapStateToProps = state => {
  const me = getMe(state)

  return {
    isAuthenticated: isAuthenticated(state),
    profileUrl: me.profileUrl,
    username: me.username
  }
}

export default connect(mapStateToProps, {
  createPost,
  fetchUserByUsername
})(Header)
