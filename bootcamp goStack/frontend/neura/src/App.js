import React from 'react';
import './config/Reactotron'
import { Router } from 'react-router-dom'
import history from './services/history'
import Routes from './routes'

import './App.css'
import GlobalStyle from './styles/global'

function App() {
  return (
    <Router history={history}>
      <Routes>
      </Routes>
      <GlobalStyle></GlobalStyle>
    </Router>
  )
}

export default App;
