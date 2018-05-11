import { put, fork } from 'redux-saga/effects'
import FriendActions from '../../Redux/FriendRedux'
import {callApi} from '../../Services/Api'

function * ensureGetFriends (api) {
  yield put(FriendActions.getFriendsRequest())
  const response = yield callApi(api.getFriends)
  if (response.ok) {
    yield put(FriendActions.getFriendsSuccess(response.data))
  } else {
    yield put(FriendActions.getFriendsFailure(response.data))
  }
}

export default function * (api) {
  yield fork(ensureGetFriends, api)
}
