import { takeLatest, put, call, select } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import {callApi} from '../../Services/Api'
import AuthActions, {AuthSelectors, AuthTypes} from '../../Redux/AuthRedux'

const serializeUserData = (data) => {
  return ({
    data: [
      { name: 'username', data: data.username },
      {
        name: 'avatar',
        filename: 'avatar.jpg',
        data: data.avatar ? RNFetchBlob.wrap(data.avatar.path) : null
      }
    ]
  })
}

const serializeUser = (data, token) => ({ token, instance: { ...data, _id: data.id } })

function * ensureUpdateUser (api, { payload }) {
  try {
    const response = yield callApi(api.updateUser, serializeUserData(payload))
    const responseJson = response.json()
    if (response.respInfo.status === 200) {
      const token = yield select(AuthSelectors.selectToken)
      const user = serializeUser(responseJson, token)
      yield call(AsyncStorage.setItem, 'auth', JSON.stringify(user))
      yield put(AuthActions.updateUserSuccess(user.instance))
    } else {
      yield put(AuthActions.updateUserFailure(responseJson))
    }
  } catch (e) {
    yield put(AuthActions.updateUserFailure())
  }
}

export default function * (api) {
  yield takeLatest(AuthTypes.UPDATE_USER_REQUEST, ensureUpdateUser, api)
}
