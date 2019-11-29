import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export default reducers => {
    const persitedReducers = persistReducer({
        key: 'neura',
        storage,
        whitelist: ['auth', 'user']
    },
        reducers
    )

    return persitedReducers
}