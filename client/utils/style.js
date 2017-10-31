import { css } from 'styled-components'

export const media = {
  sm: (...args) => css`
    @media (min-width: 540px) {
      ${css(...args)};
    }
  `
}
