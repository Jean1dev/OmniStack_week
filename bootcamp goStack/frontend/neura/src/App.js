import React from 'react';
import { Provider } from 'react-redux'
import './config/Reactotron'
import { Router } from 'react-router-dom'
import history from './services/history'
import Routes from './routes'

import store from './store'
import './App.css'
import GlobalStyle from './styles/global'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
      <Routes>
      </Routes>
      <GlobalStyle></GlobalStyle>
    </Router>
    </Provider>
  )
}

export default App;
