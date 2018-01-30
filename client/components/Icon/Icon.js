import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import homeIcon from './svg/home.svg'
import likeIcon from './svg/like.svg'
import likedIcon from './svg/liked.svg'
import menuIcon from './svg/menu.svg'
import settingsIcon from './svg/settings.svg'
import usersIcon from './svg/users.svg'

const ICONS = {
  home: {
    src: homeIcon,
    title: 'Home'
  },
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
  },
  users: {
    src: usersIcon,
    title: 'Users'
  }
}

const StyledIcon = styled.img`
  cursor: pointer;
  display: block;
  height: 24px;
  width: 24px;
`

const Icon = ({ className, name, title }) => (
  <StyledIcon
    alt={title}
    className={className}
    src={ICONS[name].src}
    title={title || ICONS[name].title}
  />
)

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default Icon
