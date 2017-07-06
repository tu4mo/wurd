import React from 'react'
import PropTypes from 'prop-types'
import './Icon.scss'

import likeIcon from './svg/like.svg'
import likedIcon from './svg/liked.svg'
import menuIcon from './svg/menu.svg'

const getIcon = name => {
  switch (name) {
    case 'like':
      return likeIcon
    case 'liked':
      return likedIcon
    case 'menu':
      return menuIcon
  }
}

const Icon = ({ className, name, onClick, title }) =>
  <img
    className={`icon ${className || ''}`}
    onClick={onClick}
    src={getIcon(name)}
    title={title}
  />

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string
}

export default Icon
