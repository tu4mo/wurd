import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from '~/utils/throttle'

class FullWidthText extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  componentDidMount() {
    window.addEventListener('resize', throttle(this.scaleHeader))

    this.scaleHeader()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scaleHeader)
  }

  scaleHeader = () => {
    const scalable = this.element
    const scalableContainer = scalable.parentNode

    scalable.style.transform = 'scale(1)'
    scalable.style.transform =
      'scale(' + scalableContainer.offsetWidth / scalable.offsetWidth + ')'
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
