import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const disablePaddingStyle = css`
  padding-left: 0;
  padding-right: 0;
`

const withYPaddingStyle = css`
  padding-bottom: var(--spacing-responsive-md);
  padding-top: var(--spacing-responsive-md);
`

const Container = styled.div`
  height: ${props => props.fullHeight && '100%'};
  margin: 0 auto;
  max-width: 1100px;
  padding-left: var(--spacing-responsive-md);
  padding-right: var(--spacing-responsive-md);
  width: 100%;

  ${props => props.disablePadding && disablePaddingStyle};
  ${props => props.withYPadding && withYPaddingStyle};
`

Container.propTypes = {
  disablePadding: PropTypes.bool,
  fullHeight: PropTypes.bool,
  withYPadding: PropTypes.bool
}

export default Container
