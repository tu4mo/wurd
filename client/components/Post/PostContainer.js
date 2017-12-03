import Post from './Post'

import { connect } from 'react-redux'
import { createComment } from '~/actions/posts'
import { getPostById } from '~/selectors/posts'

const mapStateToProps = (state, ownProps) => ({
  post: getPostById(ownProps.postId)(state)
})

export default connect(mapStateToProps, { createComment })(Post)
