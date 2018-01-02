import Like from './Like'

import { connect } from 'react-redux'
import { isAuthenticated } from '../../selectors/auth'
import { likePost, unlikePost } from '../../ducks/posts'

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state)
})

export default connect(mapStateToProps, { likePost, unlikePost })(Like)
