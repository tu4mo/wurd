import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import store from './store'
import theme from './theme'
import App from './App'

OfflinePluginRuntime.install()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component />
        </ThemeProvider>
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
