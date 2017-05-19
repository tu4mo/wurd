import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class FitText extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  constructor() {
    super()

    this.resizeText = _.debounce(this.resizeText, 10)
  }

  componentDidMount() {
    this.resizeText()

    window.addEventListener('resize', this.resizeText)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeText)
  }

  resizeText = () => {
    if (!this.props.children) return

    const parent = this.content.parentElement
    const parentStyle = getComputedStyle(parent)

    const parentPaddingX =
      parseInt(parentStyle.getPropertyValue('padding-left')) +
      parseInt(parentStyle.getPropertyValue('padding-right'))
    const parentPaddingY =
      parseInt(parentStyle.getPropertyValue('padding-bottom')) +
      parseInt(parentStyle.getPropertyValue('padding-top'))

    const maxWidth = parent.offsetWidth - parentPaddingX
    const maxHeight = parent.offsetHeight - parentPaddingY

    const setFontSize = (element, size) => {
      element.style.fontSize = `${size}px`
    }

    let i = 2
    let cantGoUp = false
    let cantGoDown = false

    while (true) {
      if (cantGoUp && cantGoDown) {
        break
      }

      if (
        this.content.offsetWidth > maxWidth ||
        this.content.offsetHeight > maxHeight
      ) {
        cantGoUp = true
        i--
        setFontSize(this.content, i)
      } else {
        cantGoDown = true
        i++
        setFontSize(this.content, i)
      }
    }
  }

  render() {
    const { children, className } = this.props

    return (
      <span className={className} ref={ref => (this.content = ref)}>
        {children}
      </span>
    )
  }
}

export default FitText
