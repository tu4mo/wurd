import styled from 'styled-components'

export const StyledPost = styled.div`
  background-color: #fff;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
  overflow: hidden;
  max-width: 640px;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: var(--spacing-responsive-md);
  }

  .comments {
    border-bottom: 1px solid var(--color-ultra-light-gray);
    padding: var(--spacing-responsive-md);
  }

  .footer {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-responsive-md);
  }

  .comment {
    flex: 1 1 auto;
    margin-right: var(--spacing-responsive-md);
  }

  .like {
    flex: 0 0 auto;
    margin-right: var(--spacing-sm);
  }

  .menu-toggle {
    transition: transform 0.1s ease-in;

    &--open {
      transform: rotate(90deg);
    }
  }
`

export const StyledPlaceholder = styled.div`
  animation: post-placeholder-animation 0.6s ease-in-out infinite;
  animation-direction: alternate;
  background-color: #fff;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
  max-width: 640px;
  opacity: 0;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: var(--spacing-responsive-md);
  }

  &::before {
    content: '';
    display: block;
    padding-top: 60%;
  }

  @keyframes post-placeholder-animation {
    0% {
      opacity: 0.2;
    }

    100% {
      opacity: 0.6;
    }
  }
`
