import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import ColorPicker from '../ColorPicker'
import './Composer.scss'

const countWords = str => str.split(' ').length

class Composer extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired
  }

  state = {
    color: {},
    content: ''
  }

  onColorChange = color => {
    this.setState({
      color
    })
  }

  onContentChange = event => {
    const content = event.target.value
      .replace(/\s\s+/g, ' ')

    if (countWords(content) > 5) {
      return false
    }

    this.setState({
      content
    })
  }

  onSaveClick = () => {
    this.props.onSaveClick({
      content: this.state.content,
      gradientEnd: this.state.color.to,
      gradientStart: this.state.color.from
    })
  }

  render() {
    const { color, content } = this.state
    const { isOpen, onCloseClick } = this.props

    if (!isOpen) {
      return null
    }

    return (
      <div className="composer-perspective">
        <div className="composer">
          <input
            className="composer__input"
            maxLength="50"
            onChange={this.onContentChange}
            placeholder="write here"
            ref={ref => (this.input = ref)}
            style={{
              backgroundImage: `linear-gradient(45deg, ${color.from}, ${color.to})`
            }}
            value={content}
          />
          <div className="composer__toolbar">
            <div className="composer__color-picker">
              <ColorPicker onChange={this.onColorChange} value={color} />
            </div>
            <div className="composer__buttons">
              <Button onClick={this.onSaveClick}>Save</Button>
              <Button onClick={onCloseClick}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Composer
