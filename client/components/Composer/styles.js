import styled from 'styled-components'

export const StyledComposer = styled.div`
  align-items: center;
  animation: composer-slide 0.5s ease-in-out;
  background-color: var(--header-background-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: top center;
  justify-content: center;

  @keyframes composer-slide {
    0% {
      max-height: 0;
      transform: rotateX(25deg);
    }

    100% {
      max-height: 500px;
      transform: rotateX(0deg);
    }
  }
`

export const StyledComposerButtons = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: var(--spacing-responsive-md);

  & > * {
    width: 100px;

    &:not(:last-child) {
      margin-right: var(--spacing-sm);
    }
  }
`

export const StyledComposerInput = styled.input`
  background-image: linear-gradient(
    45deg,
    ${props => props.gradientFrom},
    ${props => props.gradientTo}
  );
  border: 0;
  border-radius: 0;
  color: #fff;
  font-family: var(--font);
  font-size: 3rem;
  outline: none;
  padding: var(--spacing-md);
  text-align: center;
  width: 100%;

  &::-webkit-input-placeholder {
    color: #fff;
    opacity: 0.5;
  }
`

export const StyledComposerToolBar = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
  }
`

export const StyledColorPicker = styled.div`
  align-items: center;
  border-width: 0;
  border-bottom-width: 1px;
  border-color: var(--color-ultra-light-gray);
  border-style: solid;
  display: flex;
  padding: var(--spacing-responsive-md) 0;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    border-bottom-width: 0;
    border-right-width: 1px;
  }
`

export const StyledPerspective = styled.div`
  perspective: 400px;
`
