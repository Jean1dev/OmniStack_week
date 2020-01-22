import { all, takeLatest, call, put } from 'redux-saga/effects'
import { toast } from 'react-toastify'
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
        toast.success(`Perfil Atualizado`)

        yield put(updateProfileSuccess(response.data))
    } catch (error) {
        toast.error('Ocorreu um erro ao atualizar o perfil')
        yield put(updateProfileFailure())
    }
}

export default all([
    takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
])