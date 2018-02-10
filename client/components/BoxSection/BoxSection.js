import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const BoxSection = ({ children, className, hasPadding }) => (
  <div className={className}>{children}</div>
)

BoxSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasPadding: PropTypes.bool
}

const StyledBoxSection = styled(BoxSection)`
  ${props =>
    props.hasPadding &&
    css`
      padding: var(--spacing-responsive-md);
    `};

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-ultra-light-gray);
  }
`

export default StyledBoxSection
