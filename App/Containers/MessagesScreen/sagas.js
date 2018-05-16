import { fork, put } from 'redux-saga/effects'
import MessageActions from '../../Redux/MessageRedux'
import {callApi} from '../../Services/Api'

function messagesForGiftedChat (messages) {
  return messages.map(message => ({
    ...message,
    // image: message.image.medium.url,
    // text: message.image.medium.url ? null : message.text,
    _id: message.id,
    user: { ...message.User, _id: message.User.id }
  }))
}

export default function * (api, params) {
  yield fork(ensureGetMessages, api, params)
}

function * ensureGetMessages (api, params) {
  yield put(MessageActions.getMessagesRequest())
  console.log(params)
  const response = yield callApi(api.getMessages, { id: params.groupId })
  if (response.ok) {
    yield put(MessageActions.getMessagesSuccess(messagesForGiftedChat(response.data)))
  } else {
    yield put(MessageActions.getMessagesFailure(response.data))
  }
}
