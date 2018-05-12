import { takeEvery } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { ToastAndroid } from 'react-native'
import API from '../Services/Api'
import nav from './NavigatorSagas'

const checkPattern = ({ type }) => {
  return type.includes('FAILURE')
}

function * failureSaga ({ payload }) {
  ToastAndroid.show(payload.error, ToastAndroid.SHORT)
}

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  const navigator = nav(API.create())
  yield takeEvery([NavigationActions.BACK, NavigationActions.NAVIGATE], navigator)
  yield takeEvery(checkPattern, failureSaga)
}
