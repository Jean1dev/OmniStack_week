import { takeLatest, call, put, all } from 'redux-saga/effects'
import api from '../../../services/api'
import history from '../../../services/history'
import { signInSuccess, signFailure } from './actions'
import { toast } from 'react-toastify'

export function* signIn({ payload }) {
    try {
        const { email, password } = payload
        const response = yield call(api.post, 'sessions', {
            email,
            password
        })

        const { token, user } = response.data

        if (!user.provider) {
            toast.error('Usuario nao é um prestador de servico')
            return
        }

        api.defaults.headers['Authorization'] = `Bearer ${token}`

        yield put(signInSuccess(token, user))

        history.push('/dashboard')
    } catch (error) {
        toast.error('Falha na autenticacao')
        yield put(signFailure())
    }
}

export function* signUp({ payload }) {
    const { name, email, password } = payload

    try {
        yield call(api.post, 'users', {
            name, 
            email,
            password,
            provider: true
        })

        history.push('/dashboard')
    } catch (error) {
        toast.error('Falha no cadastro')

        yield put(signFailure())
    }
}

export function setToken({ payload }) {
    if (!payload) return

    const { token } = payload.auth

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }
}

export function signOut() {
    history.push('/')
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut)
])