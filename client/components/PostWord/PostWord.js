import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const stringToHash = str =>
  str
    .split('')
    .reduce(
      (prevHash, currVal) => (prevHash << 5) - prevHash + currVal.charCodeAt(0),
      0
    )

const getRotation = (word, index, date) => {
  const hash = stringToHash(`${index}${word}${+new Date(date)}`)
    .toString()
    .split('')

  const lastNumber = hash[hash.length - 1]
  return Math.round(lastNumber / 9 * -10 + 5)
}

class Word extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  }

  render() {
    const { children, className, createdAt, index } = this.props

    return (
      <div
        className={className}
        style={{
          transform: `rotate(${getRotation(children, index, createdAt)}deg`
        }}
      >
        {children}
      </div>
    )
  }
}

const StyledWord = styled(Word)`
  background-image: radial-gradient(
    #fff 75%,
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
