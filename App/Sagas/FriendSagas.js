import { put } from 'redux-saga/effects'
import FriendActions from '../Redux/FriendRedux'
import {callApi} from '../Services/Api'

export function * ensureGetFriends (api) {
  yield put(FriendActions.getFriendsRequest())
  const response = yield callApi(api.getFriends)
  if (response.ok) {
    yield put(FriendActions.getFriendsSuccess(response.data))
  } else {
    yield put(FriendActions.getFriendsFailure(response.data))
  }
}
