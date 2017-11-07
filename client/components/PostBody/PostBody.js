import React from 'react'
import PropTypes from 'prop-types'
import FullWidthText from '../FullWidthText'
import classnames from 'classnames'
import wordwrap from 'wordwrapjs'
import './PostBody.scss'

const PostBody = ({ content, fill, gradientEnd, gradientStart }) => {
  const words = wordwrap.lines(content, { break: true, width: 25 })

  return (
    <div
      className={classnames('post-body', { 'post-body--fill': fill })}
      style={{
        backgroundImage: `linear-gradient(45deg, ${gradientStart}, ${
          gradientEnd
        })`
      }}
    >
      <div className="post-body__content">
        {words.map((word, i) => (
          <FullWidthText className="post-body__row" key={i}>
            {word}
          </FullWidthText>
        ))}
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
