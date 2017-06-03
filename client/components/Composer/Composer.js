import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import ColorPicker from '../ColorPicker'
import './Composer.scss'

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
    this.setState({
      content: event.target.value.replace(
        /[^A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]/,
        ''
      )
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
            maxLength="30"
            onChange={this.onContentChange}
            placeholder="write here"
            ref={ref => (this.input = ref)}
            style={{
              backgroundImage: `linear-gradient(45deg, ${color.from}, ${color.to})`
            }}
            value={content}
          />
          <ColorPicker onChange={this.onColorChange} value={color} />
          <div className="composer__buttons">
            <Button onClick={this.onSaveClick}>
              Save
            </Button>
            <Button onClick={onCloseClick}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Composer
