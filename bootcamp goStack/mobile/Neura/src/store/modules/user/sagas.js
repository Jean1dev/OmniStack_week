import { takeLatest, call, put, all } from 'redux-saga/effects'
import { Alert } from 'react-native'

import api from '../../../services/api'

import { updateProfileSuccess, updateProfileFailure } from './actions'

export function* updateProfile({ payload }) {
    try {
        const { name, email, avatar_id, ...rest } = payload.updateProfileFailure
        const profile = Object.assign({
            name, email, avatar_id
        },
            rest.oldPassword ? rest : {}
        )

        const response = yield call(api.put, 'users', profile)

        Alert.alert('Boa', 'Perfil atualizado com sucesso')

        yield put(updateProfileSuccess(response.data))
    } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil')
        yield put(updateProfileFailure())
    }
}

export default all([takeLatest('@auth/UPDATE_PROFILE_REQUEST', updateProfile)])