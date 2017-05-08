import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ColorPicker.scss'

const COLORS = [
  '#1abc9c',
  '#16a085',
  '#2ecc71',
  '#27ae60',
  '#3498db',
  '#2980b9',
  '#9b59b6',
  '#8e44ad',
  '#34495e',
  '#2c3e50',
  '#f1c40f',
  '#f39c12',
  '#e67e22',
  '#d35400',
  '#e74c3c',
  '#c0392b',
  '#ecf0f1',
  '#bdc3c7',
  '#95a5a6',
  '#7f8c8d'
]

class ColorPicker extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  componentDidMount () {
    if (!this.props.value) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
      this.props.onChange(randomColor)
    }
  }

  render () {
    const { onChange, value } = this.props

    return (
      <div className="color-picker">
        {COLORS.map(color => (
          <div
            className={`color-picker__color ${color === value ? 'color-picker__color--active' : ''}`}
            key={color}
            onClick={() => onChange(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    )
  }
}

export default ColorPicker
