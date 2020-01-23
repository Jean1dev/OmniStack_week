import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'

export default (reducers, middlewares) => {
    const enhancer = handleSystemCreate(middlewares)
    // if (__DEV__) {

    // }
    // const enhancer = __DEV__
    //     ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
    //     : applyMiddleware(...middlewares)

    return createStore(reducers, enhancer)
}

function handleSystemCreate(middlewares) {
    if (__DEV__) {
        const compose = composeWithDevTools({ realtime: true })
        // const midd = [...middlewares, console.tron.createEnhancer()]
        return compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
    }

    return applyMiddleware(...middlewares)
}