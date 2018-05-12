import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getFriendsRequest: ['payload'],
  getFriendsSuccess: ['payload'],
  getFriendsFailure: ['payload'],
  getSearchFriendsSuccess: ['payload'],
  addFriendRequest: ['payload'],
  addFriendSuccess: ['payload'],
  addFriendFailure: ['payload']
})

export const FriendTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoading: false,
  isDataLoading: false,
  data: [],
  searchFriends: []
})

/* ------------- Selectors ------------- */

export const FriendSelectors = {
  selectIsLoading: state => state.friend.isLoading,
  selectFriends: state => state.friend.data,
  selectIsDataLoading: state => state.friend.isDataLoading,
  selectSearchFriends: state => state.friend.searchFriends
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state) =>
  state.merge({ isLoading: true })

// successful avatar lookup
export const getFriendsSuccess = (state, action) =>
  state.merge({ isLoading: false, isDataLoading: true, data: action.payload })

// failed to get the avatar
export const getFriendsFailure = (state, action) =>
  state.merge({ isLoading: false })

export const getSearchFriendsSuccess = (state, action) =>
  state.merge({ isLoading: false, searchFriends: action.payload })

export const addFriendSuccess = (state, action) =>
  state.update('data', (data) => data.concat([action.payload]))

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_FRIENDS_REQUEST]: request,
  [Types.GET_FRIENDS_SUCCESS]: getFriendsSuccess,
  [Types.GET_FRIENDS_FAILURE]: getFriendsFailure,
  [Types.GET_SEARCH_FRIENDS_SUCCESS]: getSearchFriendsSuccess,
  [Types.ADD_FRIEND_SUCCESS]: addFriendSuccess
})
