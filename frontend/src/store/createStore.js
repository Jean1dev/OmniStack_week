import { createStore, compose, applyMiddleware } from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default (reducers, middlewares) => {
    const enhancer = process.env.NODE_ENV === 'devlopment'
        ? composeEnhancers(compose(console.tron.createEnhancer(), applyMiddleware(...middlewares)))
        : composeEnhancers(applyMiddleware( ...middlewares))
        
    return createStore(reducers, enhancer)
}