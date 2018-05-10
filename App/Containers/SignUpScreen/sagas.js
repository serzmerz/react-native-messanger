import { takeLatest, call, put } from 'redux-saga/effects'
import AuthActions, { AuthTypes } from '../../Redux/AuthRedux'

function * ensureSignUp (api, { payload }) {
  // NavigationService.navigate('LaunchScreen')
  const response = yield call(api.signUp, payload)
  if (response.ok) {
    yield put(AuthActions.signUpSuccess())

  } else {
    yield put(AuthActions.signUpFailure(response.data))
  }
}

export default function * (api) {
  yield takeLatest(AuthTypes.SIGN_UP_REQUEST, ensureSignUp, api)
}
