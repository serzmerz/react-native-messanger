import { takeEvery, fork } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { ToastAndroid } from 'react-native'
import io from 'socket.io-client'
import Config from 'react-native-config'
import API from '../Services/Api'
import nav from './NavigatorSagas'

const checkPattern = ({ type }) => {
  return type.includes('FAILURE')
}

function * failureSaga ({ payload }) {
  ToastAndroid.show(payload.error || payload._error || 'Something went wrong...', ToastAndroid.SHORT)
}

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  const navigator = nav(API.create(Config.API_URL))
  yield takeEvery([NavigationActions.BACK, NavigationActions.NAVIGATE], navigator)
  yield takeEvery(checkPattern, failureSaga)
  yield fork(watchSocketSaga)
}

function * watchSocketSaga () {
  const socket = io(Config.API_URL)
}
