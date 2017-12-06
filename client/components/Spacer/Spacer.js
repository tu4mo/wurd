import styled from 'styled-components'

const Spacer = styled.div`
  & > *:not(:last-child) {
    margin-bottom: var(--spacing-sm);
  }
`

export default Spacer
