import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const ProfilePhoto = ({ className, isMe, size, url, username }) => (
  <div className={className}>
    {url && <img alt={username} className="image" src={url} title={username} />}
    {isMe && (
      <a className="change" href="https://www.gravatar.com" target="_blank">
        Change Gravatar
      </a>
    )}
  </div>
)

ProfilePhoto.propTypes = {
  className: PropTypes.string,
  isMe: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'tiny']),
  url: PropTypes.string,
  username: PropTypes.string
}

//  prettier-ignore
const StyledProfilePhoto = styled(ProfilePhoto)`
  border-radius: 50%;
  display: inline-block;
  height: 160px;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
  width: 160px;

  ${props => props.size === 'small' && css`
    height: 40px;
    width: 40px;
  `}

  ${props => props.size === 'tiny' && css`
    height: 30px;
    width: 30px;
  `}

  .change {
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    line-height: 1;
    position: absolute;
    right: 0;
    text-align: center;
    text-decoration: none;
    top: 0;
    visibility: hidden;
  }

  .image {
    display: block;
    height: 100%;
    width: 100%;
  }

  &:hover {
    .change {
      visibility: visible;
    }
  }
`

export default StyledProfilePhoto
