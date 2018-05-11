import { takeLatest, put } from 'redux-saga/effects'
import FriendsActions, { FriendTypes } from '../../Redux/FriendRedux'
import {callApi} from '../../Services/Api'

function * ensureSearchUsers (api, { payload }) {
  const response = yield callApi(api.searchUsers, { search: payload })
  if (response.ok) {
    yield put(FriendsActions.getSearchFriendsSuccess(response.data))
  } else {
    yield put(FriendsActions.getFriendsFailure(response.data))
  }
}

function * ensureAddFriend (api, { payload }) {
  const response = yield callApi(api.addFriend, { friendId: payload.id })
  if (response.ok) {
    yield put(FriendsActions.addFriendSuccess(payload))
  } else {
    yield put(FriendsActions.addFriendFailure(response.data))
  }
}

export default function * (api) {
  yield takeLatest(FriendTypes.GET_FRIENDS_REQUEST, ensureSearchUsers, api)
  yield takeLatest(FriendTypes.ADD_FRIEND_REQUEST, ensureAddFriend, api)
}
