/*import { fork, put } from 'redux-saga/effects'
import GroupActions from '../../Redux/GroupRedux'
import {callApi} from '../../Services/Api'

export default function * (api, params) {
  yield fork(ensureGetGroup, api, params)
}

function * ensureGetGroup (api, params) {
  yield put(GroupActions.getGroupRequest())
  const response = yield callApi(api.getGroup, { id: params.id })
  if (response.ok) {
    yield put(GroupActions.getGroupSuccess(response.data))
  } else {
    yield put(GroupActions.getGroupFailure(response.data))
  }
}*/
