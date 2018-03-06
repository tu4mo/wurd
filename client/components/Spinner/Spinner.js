import React, { Component } from 'react'
import styled from 'styled-components'

const StyledSpinner = styled.div`
  height: 20px;
  position: relative;

  &::before {
    animation: spinner 1s linear infinite;
    border: 2px solid transparent;
    border-radius: 50%;
    border-top-color: var(--color-dark-gray);
    box-sizing: border-box;
    content: '';
    height: 20px;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    position: absolute;
    top: 50%;
    width: 20px;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`

class Spinner extends Component {
  state = {
    showSpinner: false
  }

  componentDidMount() {
    this.timer = setTimeout(
      () =>
        this.setState({
          showSpinner: true
        }),
      200
    )
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    return this.state.showSpinner ? <StyledSpinner /> : null
  }
}

export default Spinner
