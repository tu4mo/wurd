export const media = {
  md: css => `
    @media (min-width: 720px) {
      ${css};
    }
  `,
  sm: css => `
    @media (min-width: 540px) {
      ${css};
    }
  `
}
