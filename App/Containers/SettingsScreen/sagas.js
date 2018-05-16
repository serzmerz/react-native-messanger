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

const serializeUser = data => ({ ...data, instance: { ...data.instance, _id: data.instance.id } })

function * ensureUpdateUser (api, { payload }) {
  try {
    const response = yield callApi(api.updateUser, serializeUserData(payload))
    const responseJson = response.json()
    const user = serializeUser(responseJson)
    console.log(user)
    yield call(AsyncStorage.setItem, 'auth', JSON.stringify(user))
    yield put(AuthActions.updateUserSuccess(user))
  } catch (e) {
    yield put(AuthActions.updateUserFailure(e.json()))
  }
}

export default function * (api) {
  yield takeLatest(AuthTypes.UPDATE_USER_REQUEST, ensureUpdateUser, api)
}
