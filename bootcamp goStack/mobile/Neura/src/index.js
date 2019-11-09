import React from 'react'
import { Persistgate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'

import './config/ReactotronConfig'

import { store, persistor } from './store'
import Routes from './routes'

export default function App() {
    return (
        <Provider store={store}>
            <Persistgate persistor={persistor}>
                <StatusBar barStyle="light-content" backgroundColor="#7159c1"></StatusBar>
                <Routes></Routes>
            </Persistgate>
        </Provider>
    )
}