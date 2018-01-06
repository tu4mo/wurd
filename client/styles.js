import styled from 'styled-components'

export const StyledMain = styled.main`
  padding-bottom: var(--toolbar-height);
  padding-top: var(--header-height);
  position: relative;
  z-index: 0;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding-bottom: 0;
  }
`
