import { fork, put, takeLatest } from 'redux-saga/effects'
import GroupActions, {GroupTypes} from '../../Redux/GroupRedux'
import {callApi} from '../../Services/Api'
import RNFetchBlob from 'react-native-fetch-blob'

export default function * (api, params) {
  yield fork(ensureGetGroup, api, params)
  yield takeLatest(GroupTypes.UPDATE_GROUP_REQUEST, ensureUpdateGroup, api)
  yield takeLatest(GroupTypes.LEAVE_GROUP_REQUEST, ensureLeaveGroup, api)
  yield takeLatest(GroupTypes.REMOVE_GROUP_REQUEST, ensureRemoveGroup, api)
}

function * ensureLeaveGroup (api, { payload }) {
  const response = yield callApi(api.leaveGroup, { id: payload.id })
  if (response.ok) {
    yield put(GroupActions.leaveGroupSuccess(response.data))
  } else {
    yield put(GroupActions.leaveGroupFailure(response.data))
  }
}

function * ensureRemoveGroup (api, { payload }) {
  const response = yield callApi(api.removeGroup, { id: payload.id })
  if (response.ok) {
    yield put(GroupActions.removeGroupSuccess(response.data))
  } else {
    yield put(GroupActions.removeGroupFailure(response.data))
  }
}

function * ensureGetGroup (api, params) {
  yield put(GroupActions.getGroupRequest())
  const response = yield callApi(api.getGroup, { id: params.id })
  if (response.ok) {
    yield put(GroupActions.getGroupSuccess(response.data))
  } else {
    yield put(GroupActions.getGroupFailure(response.data))
  }
}

const serializeGroupData = (data) => {
  return ({
    id: data.id,
    data: [
      { name: 'name', data: data.name },
      {
        name: 'icon',
        filename: 'icon.jpg',
        data: data.icon ? RNFetchBlob.wrap(data.icon.path) : null
      }
    ]
  })
}

function * ensureUpdateGroup (api, { payload }) {
  try {
    const response = yield callApi(api.updateGroup, serializeGroupData(payload))
    yield put(GroupActions.updateGroupSuccess(response.json()))
  } catch (e) {
    yield put(GroupActions.updateGroupFailure(e.json()))
  }
}
