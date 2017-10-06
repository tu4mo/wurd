import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from '~/utils/throttle'

class FullWidthText extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  componentDidMount() {
    window.addEventListener('resize', this.scaleHeaderThrottled)

    this.scaleHeader()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scaleHeaderThrottled)
  }

  scaleHeaderThrottled = throttle(() => this.scaleHeader(), 50)

  scaleHeader = () => {
    const MAX_SCALE = 20
    const scalable = this.element
    const scalableContainer = scalable.parentNode

    scalable.style.transform = 'scale(1)'
    const scale = scalableContainer.offsetWidth / scalable.offsetWidth
    scalable.style.transform = `scale(${scale < MAX_SCALE ? scale : MAX_SCALE})`
    scalableContainer.style.height =
      scalable.getBoundingClientRect().height + 'px'
  }

  render() {
    const { className, children } = this.props

    return (
      <div className={className}>
        <div
          ref={ref => (this.element = ref)}
          style={{
            display: 'inline-block',
            transform: 'translate3d(0, 0, 0)',
            transformOrigin: '50% 0'
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default FullWidthText
