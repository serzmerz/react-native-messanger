import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getGroupsRequest: null,
  getGroupsSuccess: ['payload'],
  getGroupsFailure: ['payload'],
  addGroupRequest: ['payload'],
  addGroupSuccess: ['payload'],
  addGroupFailure: ['payload'],
  getGroupRequest: ['payload'],
  getGroupSuccess: ['payload'],
  getGroupFailure: ['payload'],
  updateGroupRequest: ['payload'],
  updateGroupSuccess: ['payload'],
  updateGroupFailure: ['payload'],
  leaveGroupRequest: ['payload'],
  leaveGroupSuccess: ['payload'],
  leaveGroupFailure: ['payload'],
  removeGroupRequest: ['payload'],
  removeGroupSuccess: ['payload'],
  removeGroupFailure: ['payload']
})

export const GroupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoading: false,
  data: [],
  group: {}
})

/* ------------- Selectors ------------- */

export const GroupSelectors = {
  selectIsLoading: state => state.group.isLoading,
  selectGroups: state => state.group.data,
  selectGroup: state => state.group.group
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state) =>
  state.merge({ isLoading: true })

// successful avatar lookup
export const getGroupsSuccess = (state, action) =>
  state.merge({ isLoading: false, data: action.payload })

// failed to get the avatar
export const failure = (state, action) =>
  state.merge({ isLoading: false })

export const addGroupSuccess = (state, action) =>
  state.update('data', (data) => data.concat([action.payload]))

export const getGroupSuccess = (state, action) =>
  state.set('group', action.payload)
    .set('isLoading', false)

export const updateGroupSuccess = (state, { payload }) =>
  state.set('group', payload)
    .set('isLoading', false)
    .update('data', data => data.map(item => item.id === payload.id ? payload : item))

export const removeGroupSuccess = (state, { payload }) =>
  state.update('data', data => data.filter(item => item.id !== Number(payload.id)))
    .set('group', null)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_GROUPS_REQUEST]: request,
  [Types.GET_GROUPS_SUCCESS]: getGroupsSuccess,
  [Types.GET_GROUPS_FAILURE]: failure,
  [Types.ADD_GROUP_SUCCESS]: addGroupSuccess,
  [Types.GET_GROUP_REQUEST]: request,
  [Types.GET_GROUP_FAILURE]: failure,
  [Types.GET_GROUP_SUCCESS]: getGroupSuccess,
  [Types.UPDATE_GROUP_REQUEST]: request,
  [Types.UPDATE_GROUP_FAILURE]: failure,
  [Types.UPDATE_GROUP_SUCCESS]: updateGroupSuccess,
  [Types.LEAVE_GROUP_SUCCESS]: removeGroupSuccess,
  [Types.REMOVE_GROUP_SUCCESS]: removeGroupSuccess
})
