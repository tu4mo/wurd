import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import ColorPicker from '../ColorPicker'
import './Composer.scss'

class NewPost extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCloseClick: PropTypes.func.isRequired
  }

  state = {
    color: '',
    content: ''
  }

  onColorChange = color => {
    this.setState({
      color
    })
  }

  onContentChange = event => {
    this.setState({
      content: event.target.value.replace(/\s/, '')
    })
  }

  onSaveClick = () => {}

  render () {
    const { color, content } = this.state
    const { isOpen, onCloseClick } = this.props

    if (!isOpen) {
      return null
    }

    return (
      <div className="composer">
        <input
          autoFocus
          className="composer__input"
          maxLength="30"
          onChange={this.onContentChange}
          placeholder="write here"
          ref={ref => (this.input = ref)}
          style={{ backgroundColor: color }}
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
    )
  }
}

export default NewPost
