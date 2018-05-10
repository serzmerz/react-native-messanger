import { put, fork } from 'redux-saga/effects'
import GroupActions from '../../Redux/GroupRedux'
import {callApi} from '../../Services/Api'

function * ensureGetGroups (api) {
  yield put(GroupActions.getGroupsRequest())
  const response = yield callApi(api.getGroups)
  if (response.ok) {
    yield put(GroupActions.getGroupsSuccess(response.data))
  } else {
    yield put(GroupActions.getGroupsFailure(response.data))
  }
}

export default function * (api) {
  yield fork(ensureGetGroups, api)
}
