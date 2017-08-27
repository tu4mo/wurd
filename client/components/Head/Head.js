import React from 'react'
import { Helmet } from 'react-helmet'

const WrappedHelmet = props => (
  <Helmet defaultTitle="Wurd" titleTemplate="%s - Wurd" {...props} />
)

export default WrappedHelmet
