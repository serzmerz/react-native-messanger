import { fork, put, takeLatest } from 'redux-saga/effects'
import MessageActions, { MessageTypes } from '../../Redux/MessageRedux'
import RNFetchBlob from 'react-native-fetch-blob'
import Config from 'react-native-config'
import {callApi} from '../../Services/Api'

function messagesForGiftedChat (messages) {
  return messages.map(message => ({
    ...message,
    image: message.image && `${Config.API_URL}${message.image}`,
    // text: message.image.medium.url ? null : message.text,
    _id: message.id,
    user: { ...message.User, _id: message.User.id }
  }))
}

function serializeMessage (payload, id) {
  return ({
    id,
    data: [
      { name: 'text', data: payload.text },
      {
        name: 'image',
        filename: 'image.jpg',
        data: payload.image ? RNFetchBlob.wrap(payload.image) : null
      }
    ]
  })
}

export default function * (api, params) {
  yield fork(ensureGetMessages, api, params)
  yield takeLatest(MessageTypes.ADD_MESSAGE_REQUEST, ensureSendMessage, api, params)
}

function * ensureGetMessages (api, params) {
  yield put(MessageActions.getMessagesRequest())
  const response = yield callApi(api.getMessages, { id: params.groupId })
  if (response.ok) {
    yield put(MessageActions.getMessagesSuccess(messagesForGiftedChat(response.data)))
  } else {
    yield put(MessageActions.getMessagesFailure(response.data))
  }
}

function * ensureSendMessage (api, params, { payload }) {
  try {
    console.log(params)
    console.log(payload)
    const data = yield callApi(api.addMessage, serializeMessage(payload, params.groupId))
    console.log(data)
    yield put(MessageActions.addMessageSuccess())
  } catch (e) {
    yield put(MessageActions.addMessageFailure(e))
  }
}
