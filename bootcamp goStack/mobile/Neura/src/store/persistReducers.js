import storage from 'redux-persist/lib/storage'
import { PersistReducer } from 'redux-persist'

export default reducers => {
    const persistedReducer = PersistReducer({
        key: 'neura',
        storage,
        whitelist: ['auth', 'user']
    },
        reducers
    )
    return persistedReducer
}