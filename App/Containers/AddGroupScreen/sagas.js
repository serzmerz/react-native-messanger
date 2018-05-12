import { fork, select, takeLatest, put } from 'redux-saga/effects'
import { ToastAndroid } from 'react-native'
import {ensureGetFriends} from '../../Sagas/FriendSagas'
import {FriendSelectors} from '../../Redux/FriendRedux'
import GroupsActions, {GroupTypes} from '../../Redux/GroupRedux'
import {callApi} from '../../Services/Api'

const serializeGroupData = group => ({...group, userIds: group.userIds.map(user => user.id)})

function * ensureAddGroup (api, { payload }) {
  const response = yield callApi(api.addGroup, { data: serializeGroupData(payload) })
  if (response.ok) {
    yield put(GroupsActions.addGroupSuccess(response.data))
    ToastAndroid.show('Your add group success', ToastAndroid.SHORT)
  } else {
    yield put(GroupsActions.addGroupFailure(response.data))
  }
}

export default function * (api) {
  const isDataLoading = yield select(FriendSelectors.selectIsDataLoading)
  if (!isDataLoading) yield fork(ensureGetFriends, api)
  yield takeLatest(GroupTypes.ADD_GROUP_REQUEST, ensureAddGroup, api)
}
