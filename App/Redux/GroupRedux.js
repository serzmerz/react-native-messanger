import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getGroupsRequest: null,
  getGroupsSuccess: ['payload'],
  getGroupsFailure: ['payload'],
  addGroupRequest: ['payload'],
  addGroupSuccess: ['payload'],
  addGroupFailure: ['payload']
})

export const GroupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoading: false,
  data: []
})

/* ------------- Selectors ------------- */

export const GroupSelectors = {
  selectIsLoading: state => state.group.isLoading,
  selectGroups: state => state.group.data
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state) =>
  state.merge({ isLoading: true })

// successful avatar lookup
export const getGroupsSuccess = (state, action) =>
  state.merge({ isLoading: false, data: action.payload })

// failed to get the avatar
export const getGroupsFailure = (state, action) =>
  state.merge({ isLoading: false })

export const addGroupSuccess = (state, action) =>
  state.update('data', (data) => data.concat([action.payload]))

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_GROUPS_REQUEST]: request,
  [Types.GET_GROUPS_SUCCESS]: getGroupsSuccess,
  [Types.GET_GROUPS_FAILURE]: getGroupsFailure,
  [Types.ADD_GROUP_SUCCESS]: addGroupSuccess
})
