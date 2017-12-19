import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'

import store from './store'
import en from './locale/en'
import theme from './theme'
import App from './App'

OfflinePluginRuntime.install()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <IntlProvider locale="en" messages={en}>
          <ThemeProvider theme={theme}>
            <Component />
          </ThemeProvider>
        </IntlProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
