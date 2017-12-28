import styled from 'styled-components'

export const StyledPostBody = styled.div`
  background-image: linear-gradient(
    45deg,
    ${props => props.gradientStart},
    ${props => props.gradientEnd}
  );
  position: relative;
  min-height: 200px;

  &::before {
    content: '';
    display: block;
    padding-top: ${props => (props.fill ? '100%' : '50%')};
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

export const StyledWord = styled.div`
  background-image: radial-gradient(
    #fff 50%,
    var(--color-ultra-light-gray) 100%
  );
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: var(--color-dark-gray);
  margin: var(--spacing-xs);
  padding: var(--spacing-xs);
  text-transform: uppercase;
`
