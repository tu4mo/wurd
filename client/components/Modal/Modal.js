import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const modalRoot = document.getElementById('modal')

const StyledModal = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
`

const ModalContent = styled.div`
  max-width: 640px;
`

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  el = document.createElement('div')

  render() {
    return createPortal(
      <StyledModal>
        <ModalContent>{this.props.children}</ModalContent>
      </StyledModal>,
      this.el
    )
  }
}

export default Modal
