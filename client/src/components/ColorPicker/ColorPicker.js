import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ColorPicker.scss'

const GRADIENTS = [
  { from: '#84fab0', to: '#8fd3f4' },
  { from: '#fccb90', to: '#d57eeb' },
  { from: '#642b73', to: '#c6426e' },
  { from: '#36d1dc', to: '#5b86e5' },
  { from: '#159957', to: '#155799' },
  { from: '#30e8bf', to: '#ff8235' },
  { from: '#4568dc', to: '#b06ab3' },
  { from: '#ffafbd', to: '#ffc3a0' },
  { from: '#dce35b', to: '#45b649' },
  { from: '#ee0979', to: '#ff6a00' },
  { from: '#3a6186', to: '#89253e' },
  { from: '#bdc3c7', to: '#2c3e50' },
  { from: '#ffd89b', to: '#19547b' },
  { from: '#f79d00', to: '#64f38c' },
  { from: '#cb2d3e', to: '#ef473a' },
  { from: '#141e30', to: '#243b55' },
  { from: '#1d4350', to: '#a43931' },
  { from: '#5614b0', to: '#dbd65c' },
  { from: '#f1f2b5', to: '#135058' },
  { from: '#485563', to: '#29323c' },
  { from: '#ff4e50', to: '#f9d423' },
  { from: '#fc354c', to: '#0abfbc' }
]

class ColorPicker extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object
  }

  componentDidMount () {
    const randomGradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
    this.props.onChange(randomGradient)
  }

  render () {
    const { onChange, value } = this.props

    return (
      <div className="color-picker">
        {GRADIENTS.map((gradient, i) => (
          <div
            className={`color-picker__color ${gradient === value ? 'color-picker__color--active' : ''}`}
            key={i}
            onClick={() => onChange(gradient)}
            style={{ backgroundImage: `linear-gradient(45deg, ${gradient.from}, ${gradient.to}` }}
          />
        ))}
      </div>
    )
  }
}

export default ColorPicker
