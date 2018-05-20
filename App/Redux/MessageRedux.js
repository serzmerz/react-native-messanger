import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { GiftedChat } from 'react-native-gifted-chat/src/GiftedChat'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getMessagesRequest: null,
  getMessagesSuccess: ['payload'],
  getMessagesFailure: ['payload'],
  addMessageRequest: ['payload'],
  addMessageSuccess: ['payload'],
  addMessageFailure: ['payload']
})

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoading: false,
  data: []
})

/* ------------- Selectors ------------- */

export const MessageSelectors = {
  selectIsLoading: state => state.message.isLoading,
  selectMessages: state => state.message.data
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state) =>
  state.merge({ isLoading: true })

// successful avatar lookup
export const getMessagesSuccess = (state, action) =>
  state.merge({ isLoading: false, data: action.payload })

// failed to get the avatar
export const failure = (state, action) =>
  state.merge({ isLoading: false })

export const addMessageRequest = (state, action) =>
  state.update('data', (data) => GiftedChat.append(data, action.payload))

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MESSAGES_REQUEST]: request,
  [Types.GET_MESSAGES_SUCCESS]: getMessagesSuccess,
  [Types.GET_MESSAGES_FAILURE]: failure,
  [Types.ADD_MESSAGE_REQUEST]: addMessageRequest
})
