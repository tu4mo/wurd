import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const getRotation = () => {
  const deg = Math.floor(Math.random() * 10 + -5)
  return deg !== 0 ? deg : getRotation()
}

class Word extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string.isRequired
  }

  render() {
    const { children, className } = this.props

    return (
      <div
        className={className}
        style={{
          transform: `rotate(${getRotation()}deg`
        }}
      >
        {children}
      </div>
    )
  }
}

const StyledWord = styled(Word)`
  background-image: radial-gradient(
    #fff 50%,
    var(--color-ultra-light-gray) 100%
  );
  border-radius: 1px;
  box-shadow: var(--shadow);
  color: var(--color-dark-gray);
  font-weight: 700;
  margin: 0.3em;
  padding: 0.3em;
  text-transform: uppercase;
  white-space: nowrap;
`

export default StyledWord
