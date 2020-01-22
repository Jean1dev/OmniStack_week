import { Alert } from 'react-native'
import { all, takeLatest, call, put } from 'redux-saga/effects'
import api from '../../../services/api'
import { updateProfileSuccess, updateProfileFailure } from './actions'

export function* updateProfile({ payload }) {
    const { name, email, avatar_id, ...rest } = payload.data

    const profile = Object.assign(
        { name, email, avatar_id },
        rest.oldPassword ? rest : {}
    )

    try {
        const response = yield call(api.put, 'users', profile)
        Alert.alert('Atencao', `Perfil Atualizado`)

        yield put(updateProfileSuccess(response.data))
    } catch (error) {
        Alert.alert('Atencao', 'Ocorreu um erro ao atualizar o perfil')
        yield put(updateProfileFailure())
    }
}

export default all([
    takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
])