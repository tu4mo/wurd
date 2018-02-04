import styled from 'styled-components'

export const StyledPostBody = styled.div`
  background-image: linear-gradient(
    45deg,
    ${props => props.gradientStart},
    ${props => props.gradientEnd}
  );
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    display: block;
    padding-top: ${props => (props.fill ? '100%' : '50%')};
  }

  .post-body-md {
    font-size: 20px;
  }

  .post-body-lg {
    font-size: 30px;
  }
`

export const StyledPostContent = styled.div`
  align-content: center;
  align-items: center;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  left: 0;
  line-height: 1;
  padding: var(--spacing-md);
  position: absolute;
  top: 0;
  width: 100%;
`
