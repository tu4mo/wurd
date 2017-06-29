import React from 'react'
import PropTypes from 'prop-types'
import { Textfit } from 'react-textfit'
import './PostBody.scss'

const PostBody = ({ content, gradientEnd, gradientStart }) =>
  <div
    className="post-body"
    style={{
      backgroundImage: `linear-gradient(45deg, ${gradientStart}, ${gradientEnd})`
    }}
  >
    <Textfit className="post-body__content" mode="single">
      {content}
    </Textfit>
  </div>

PostBody.propTypes = {
  content: PropTypes.string,
  gradientEnd: PropTypes.string,
  gradientStart: PropTypes.string
}

export default PostBody
