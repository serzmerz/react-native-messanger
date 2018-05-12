import { fork, select } from 'redux-saga/effects'
import {ensureGetFriends} from '../../Sagas/FriendSagas'
import {FriendSelectors} from '../../Redux/FriendRedux'

export default function * (api) {
  const isDataLoading = yield select(FriendSelectors.selectIsDataLoading)
  if (!isDataLoading) yield fork(ensureGetFriends, api)
}
