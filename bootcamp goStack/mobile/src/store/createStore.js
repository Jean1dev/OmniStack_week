import { createStore, compose, applyMiddleware } from 'redux'


export default (reducers, middlewares) => {
    const enhancer = __DEV__ === 'devlopment'
        ? composeEnhancers(compose(console.tron.createEnhancer(), applyMiddleware(...middlewares)))
        : applyMiddleware( ...middlewares)
        
    return createStore(reducers, enhancer)
}