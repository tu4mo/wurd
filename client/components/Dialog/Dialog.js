import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from '../Box'
import BoxSection from '../BoxSection'
import Button from '../Button'

const Dialog = ({ children, className, onCancel, onConfirm }) => (
  <Box className={className}>
    <BoxSection hasPadding>
      <div style={{ marginBottom: 'var(--spacing-md)' }}>{children}</div>
      <Button onClick={onCancel} style={{ marginRight: 'var(--spacing-sm)' }}>
        Stay on This Page
      </Button>
      <Button onClick={onConfirm} secondary>
        Leave This Page
      </Button>
    </BoxSection>
  </Box>
)

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
}

const StyledDialog = styled(Dialog)`
  max-width: 640px;
`

export default StyledDialog
