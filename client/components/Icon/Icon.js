import React from 'react'
import PropTypes from 'prop-types'
import menuIcon from './svg/menu.svg'
import './Icon.scss'

const getIcon = name => {
  switch (name) {
    case 'menu':
      return menuIcon
  }
}

const Icon = ({ name, onClick }) => {
  return <img className="icon" onClick={onClick} src={getIcon(name)} />
}

Icon.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func
}

export default Icon
