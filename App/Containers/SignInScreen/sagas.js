import { takeLatest, call, put } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import AuthActions, { AuthTypes } from '../../Redux/AuthRedux'

function * ensureSignIn (api, { payload }) {
  const response = yield call(api.signIn, payload)
  if (response.ok) {
    yield call(AsyncStorage.setItem, 'auth', JSON.stringify(response.data))
    yield put(AuthActions.signInSuccess(response.data))
  } else {
    yield put(AuthActions.signInFailure(response.data))
  }
}

export default function * (api) {
  yield takeLatest(AuthTypes.SIGN_IN_REQUEST, ensureSignIn, api)
}
