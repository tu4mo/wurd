import React from 'react'
import PropTypes from 'prop-types'
import { Textfit } from 'react-textfit'
import wordwrap from 'wordwrapjs'
import './PostBody.scss'

const PostBody = ({ content, fill, gradientEnd, gradientStart }) => {
  const words = wordwrap.lines(content, { break: true, width: 20 })

  return (
    <div
      className={`post-body ${fill ? 'post-body--fill' : ''}`}
      style={{
        backgroundImage: `linear-gradient(45deg, ${gradientStart}, ${gradientEnd})`
      }}
    >
      <div className="post-body__content">
        {words.map(word =>
          <Textfit
            className="post-body__row"
            forceSingleModeWidth
            max={140}
            mode="single"
          >
            {word}
          </Textfit>
        )}
      </div>
    </div>
  )
}

PostBody.propTypes = {
  content: PropTypes.string,
  fill: PropTypes.bool,
  gradientEnd: PropTypes.string,
  gradientStart: PropTypes.string
}

export default PostBody
