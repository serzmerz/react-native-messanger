import { takeLatest, call, put } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import AuthActions, { AuthTypes } from '../../Redux/AuthRedux'

const serializeUser = data => ({ ...data, instance: { ...data.instance, _id: data.instance.id } })

function * ensureSignIn (api, { payload }) {
  const response = yield call(api.signIn, payload)
  if (response.ok) {
    const user = serializeUser(response.data)
    yield call(AsyncStorage.setItem, 'auth', JSON.stringify(user))
    yield put(AuthActions.signInSuccess(user))
  } else {
    yield put(AuthActions.signInFailure(response.data))
  }
}

export default function * (api) {
  yield takeLatest(AuthTypes.SIGN_IN_REQUEST, ensureSignIn, api)
}
