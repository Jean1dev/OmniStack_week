import { takeLatest, call, put, all } from 'redux-saga/effects'
import { Alert } from 'react-native'

import api from '../../../services/api'

import { signInSuccess, signFailure } from './actions'

export function* signIn({ payload }) {
    try {
        const { email, password } = payload

        const response = yield call(api.post, 'sessions', {
            email,
            password
        })

        const { token, user } = response.data

        if (user.provider) {
            Alert.alert('Erro no login', 'Usuario nao é um prestador')
            return
        }

        api.defaults.headers.Authorization = `Bearer ${token}`

        yield put(signInSuccess(token, user))
    } catch (error) {
        Alert.alert('Erro no login', 'Falha na autenticacao, verifique os dados')
        yield put(signFailure())
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload

        yield call(api.post, 'users', {
            name,
            email,
            password,
            provider: true
        })
    } catch (error) {
        Alert.alert('Erro no Cadastro', 'Falha na cadastro, verifique os dados')
        yield put(signFailure())
    }
}

export function setToken({ payload }) {
    if (!payload) return

    const { token } = payload.auth

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`
    }
}

export function signOut() {

}

export default all([
    takeLatest('@persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
])