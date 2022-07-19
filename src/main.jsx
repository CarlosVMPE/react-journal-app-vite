import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { JounalApp } from './JounalApp'
import { store } from './store'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <JounalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
