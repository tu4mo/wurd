import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import ColorPicker from '../ColorPicker'

import {
  StyledColorPicker,
  StyledComposer,
  StyledComposerButtons,
  StyledComposerInput,
  StyledComposerToolBar,
  StyledPerspective
} from './styles'

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
    const content = event.target.value.replace(/\s\s+/g, ' ')

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
    const { color, color: { from, to }, content } = this.state
    const { isOpen, onCloseClick } = this.props

    if (!isOpen) {
      return null
    }

    return (
      <StyledPerspective>
        <StyledComposer>
          <StyledComposerInput
            gradientFrom={from}
            gradientTo={to}
            maxLength="50"
            onChange={this.onContentChange}
            placeholder="write here"
            ref={ref => (this.input = ref)}
            value={content}
          />
          <StyledComposerToolBar>
            <StyledColorPicker>
              <ColorPicker onChange={this.onColorChange} value={color} />
            </StyledColorPicker>
            <StyledComposerButtons>
              <Button onClick={this.onSaveClick}>Save</Button>
              <Button onClick={onCloseClick}>Cancel</Button>
            </StyledComposerButtons>
          </StyledComposerToolBar>
        </StyledComposer>
      </StyledPerspective>
    )
  }
}

export default Composer
