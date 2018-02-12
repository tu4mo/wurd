import styled, { injectGlobal } from 'styled-components'
import { media } from './utils/style'

export const StyledMain = styled.main`
  padding-bottom: var(--toolbar-height);
  padding-top: var(--header-height);
  position: relative;
  z-index: 0;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding-bottom: 0;
  }
`

injectGlobal`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --color-background: #f4f4f8;
    --color-red: #ff5722;
    --color-dark-gray: #333337;
    --color-gray: #66666a;
    --color-light-gray: #99999d;
    --color-ultra-light-gray: #eeeef2;
    --font: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif;
    --font-size-lg: 16px;
    --font-size-md: 14px;
    --font-size-sm: 0.9rem;
    --header-background-color: rgba(255, 255, 255, 0.96);
    --header-height: 70px;
    --radius-lg: 20px;
    --radius-sm: 5px;
    --shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    --spacing-md: 30px;
    --spacing-sm: 15px;
    --spacing-xs: 5px;
    --spacing-responsive-md: 15px;
    --toolbar-height: 50px;

    font-size: 12px;

    ${media.sm`
      --header-height: 80px;

      font-size: 14px;
    `};

    ${media.md`
      --spacing-responsive-md: 30px;
    `};
  }

  body {
    background: var(--color-background);
    color: var(--color-dark-gray);
    font-family: var(--font);
  }

  a {
    color: var(--color-dark-gray);
  }
`
