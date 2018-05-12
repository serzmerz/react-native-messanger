import { takeLatest, put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'
import {callApi} from '../../Services/Api'
import AuthActions, {AuthTypes} from '../../Redux/AuthRedux'

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

function * ensureUpdateUser (api, { payload }) {
  try {
    const response = yield callApi(api.updateUser, serializeUserData(payload))
    yield call(AsyncStorage.setItem, 'auth', response.data)
    yield put(AuthActions.updateUserSuccess(response.json()))
  } catch (e) {
    yield put(AuthActions.updateUserFailure(e.json()))
  }
}

export default function * (api) {
  yield takeLatest(AuthTypes.UPDATE_USER_REQUEST, ensureUpdateUser, api)
}
