import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { AsyncStorage } from 'react-native'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signUpRequest: ['payload'],
  signUpSuccess: null,
  signUpFailure: ['payload'],
  signInRequest: ['payload'],
  signInSuccess: ['payload'],
  signInFailure: ['payload'],
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoading: false,
  isAuthorized: false,
  instance: {},
  token: null
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  selectIsLoading: state => state.auth.isLoading,
  selectIsAuthorized: state => state.auth.isAuthorized,
  selectUser: state => state.auth.instance,
  selectToken: state => state.auth.token
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state) =>
  state.merge({ isLoading: true })

// successful avatar lookup
export const successSignUp = (state, action) =>
  state.merge({ isLoading: false })

// failed to get the avatar
export const failureSignUp = (state, action) =>
  state.merge({ isLoading: false })

export const successSignIn = (state, action) =>
  state.merge({ isLoading: false, isAuthorized: true, ...action.payload })

export const failureSignIn = (state, action) => INITIAL_STATE
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_UP_REQUEST]: request,
  [Types.SIGN_UP_SUCCESS]: successSignUp,
  [Types.SIGN_UP_FAILURE]: failureSignUp,
  [Types.SIGN_IN_REQUEST]: request,
  [Types.SIGN_IN_SUCCESS]: successSignIn,
  [Types.SIGN_IN_FAILURE]: failureSignIn,
})
