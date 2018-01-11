import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'

import store from './store'
import en from './locale/en'
import theme from './theme'
import App from './App'

OfflinePluginRuntime.install()

const Index = () => (
  <Provider store={store}>
    <IntlProvider locale="en" messages={en}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </IntlProvider>
  </Provider>
)

ReactDOM.render(<Index />, document.getElementById('root'))
