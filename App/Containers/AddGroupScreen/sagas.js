import { fork, select, takeLatest, put } from 'redux-saga/effects'
import { ToastAndroid } from 'react-native'
import {ensureGetFriends} from '../../Sagas/FriendSagas'
import {FriendSelectors} from '../../Redux/FriendRedux'
import GroupsActions, {GroupTypes} from '../../Redux/GroupRedux'
import {callApi} from '../../Services/Api'
import RNFetchBlob from 'react-native-fetch-blob'

const serializeGroupData = group => ({ data: [
  { name: 'name', data: group.name },
  { name: 'userIds', data: JSON.stringify(group.userIds.map(user => user.id)) },
  {
    name: 'icon',
    filename: 'icon.jpg',
    data: group.icon ? RNFetchBlob.wrap(group.icon.path) : null
  }
]})

function * ensureAddGroup (api, { payload }) {
  try {
    const response = yield callApi(api.addGroup, serializeGroupData(payload))
    yield put(GroupsActions.addGroupSuccess(response.json()))
    ToastAndroid.show('Your add group success', ToastAndroid.SHORT)
  } catch (e) {
    yield put(GroupsActions.addGroupFailure(e.json()))
  }
}

export default function * (api) {
  const isDataLoading = yield select(FriendSelectors.selectIsDataLoading)
  if (!isDataLoading) yield fork(ensureGetFriends, api)
  yield takeLatest(GroupTypes.ADD_GROUP_REQUEST, ensureAddGroup, api)
}
