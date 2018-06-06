import { fork, put, takeLatest, call, take } from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import MessageActions, { MessageTypes } from '../../Redux/MessageRedux'
import RNFetchBlob from 'react-native-fetch-blob'
import Config from 'react-native-config'
import {callApi} from '../../Services/Api'
import socket from '../../Lib/socket'

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
  yield fork(watchSubscribe, params)
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
    yield callApi(api.addMessage, serializeMessage(payload, params.groupId))
    yield put(MessageActions.addMessageSuccess())
  } catch (e) {
    yield put(MessageActions.addMessageFailure(e))
  }
}

function * watchSubscribe (params) {
  socket.emit('unsubscribe')
  socket.emit('subscribe', {room: params.groupId})
  const channel = yield call(subscribe, socket)
  while (true) {
    let payload = yield take(channel)
    yield put(MessageActions.addMessageLocal(payload))
  }
}

function subscribe (socket) {
  return eventChannel(emit => {
    socket.on('chat message', (message) => {
      const parsedMessage = [JSON.parse(message)]
      emit(messagesForGiftedChat(parsedMessage)[0])
    })
    return () => {}
  })
}
