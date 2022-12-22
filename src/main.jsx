import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { JurnalApp } from './JurnalApp'
import { store } from './store/store'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <JurnalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
