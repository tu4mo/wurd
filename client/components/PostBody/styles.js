import styled from 'styled-components'

import ProfilePhoto from '../ProfilePhoto'

export const StyledPostBody = styled.div`
  background-image: linear-gradient(
    45deg,
    ${props => props.gradientStart},
    ${props => props.gradientEnd}
  );
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    display: block;
    padding-top: ${props => (props.fill ? '100%' : '60%')};
  }

  .post-body-md {
    font-size: 20px;
  }

  .post-body-lg {
    font-size: 30px;
  }
`

export const StyledPostHeader = styled.div`
  align-items: center;
  display: flex;
  left: 0;
  padding: var(--spacing-responsive-md);
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 3;

  .user {
    color: #fff;
    font-weight: 600;
    text-decoration: none;
  }

  .time {
    color: #fff;
    margin-left: auto;
    text-decoration: none;
    opacity: 0.5;
  }
`

export const StyledProfilePhoto = styled(ProfilePhoto)`
  margin-right: var(--spacing-sm);
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
  z-index: 2;
`
