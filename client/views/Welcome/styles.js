import styled from 'styled-components'
import { media } from '../../utils/style'

export const StyledWelcome = styled.div`
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
`

export const StyledWelcomeContent = styled.div`
  bottom: -30px;
  left: -30px;
  opacity: 0.4;
  position: absolute;
  right: -30px;
  top: -30px;
`

export const StyledWelcomeForm = styled.div`
  left: 0;
  padding: var(--spacing-responsive-md);
  position: absolute;
  top: calc(var(--header-height) * 2 - var(--spacing-responsive-md));
  width: 100%;
`

export const StyledWelcomeItem = styled.div`
  float: left;
  position: relative;
  width: 33.33%;

  ${media.md`
    width: 16.66%;
  `};

  &::after {
    content: '';
    display: block;
    padding-top: 100%;
  }
`

export const StyledWelcomePost = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
