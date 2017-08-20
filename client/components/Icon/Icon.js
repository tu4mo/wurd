import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Icon.scss'

import likeIcon from './svg/like.svg'
import likedIcon from './svg/liked.svg'
import menuIcon from './svg/menu.svg'
import settingsIcon from './svg/settings.svg'

const ICONS = {
  like: {
    src: likeIcon,
    title: 'Like'
  },
  liked: {
    src: likedIcon,
    title: 'Liked'
  },
  menu: {
    src: menuIcon,
    title: 'Menu'
  },
  settings: {
    src: settingsIcon,
    title: 'Settings'
  }
}

const Icon = ({ className, name, onClick, title }) =>
  <img
    className={classnames('icon', className)}
    onClick={onClick}
    src={ICONS[name].src}
    title={title || ICONS[name].title}
  />

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string
}

export default Icon
