// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { select, call } from 'redux-saga/effects'
import { AuthSelectors } from '../Redux/AuthRedux'
import RNFetchBlob from 'react-native-fetch-blob'

// our "constructor"
const create = (baseURL = 'http://192.168.0.107:3000/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const signUp = (payload) => api.post('signup', payload)
  const signIn = (payload) => api.post('login', payload)
  const getGroups = (payload) => {
    api.setHeaders(payload.headers)
    return api.get('user/groups')
  }
  const getGroup = (payload) => {
    api.setHeaders(payload.headers)
    return api.get(`user/group/${payload.id}`)
  }
  const getFriends = (payload) => {
    api.setHeaders(payload.headers)
    return api.get('user/friends')
  }
  const searchUsers = (payload) => {
    api.setHeaders(payload.headers)
    return api.get('user/users', { search: payload.search })
  }
  const addFriend = (payload) => {
    api.setHeaders(payload.headers)
    return api.post(`user/friends/${payload.friendId}`)
  }
  const addGroup = ({ headers, data }) => {
    return RNFetchBlob.fetch('POST', `${baseURL}user/group`, {
      ...headers,
      'Content-Type': 'multipart/form-data'
    }, data)
  }
  const updateUser = ({ headers, data }) => {
    return RNFetchBlob.fetch('PUT', `${baseURL}user`, {
      ...headers,
      'Content-Type': 'multipart/form-data'
    }, data)
  }
  const updateGroup = ({ headers, data, id }) => {
    return RNFetchBlob.fetch('PUT', `${baseURL}user/group/${id}`, {
      ...headers,
      'Content-Type': 'multipart/form-data'
    }, data)
  }

  const leaveGroup = ({ headers, id }) => {
    api.setHeaders(headers)
    return api.post(`user/group/${id}/leave`)
  }
  const removeGroup = ({ headers, id }) => {
    api.setHeaders(headers)
    return api.delete(`user/group/${id}`)
  }

  const getMessages = ({ headers, id }) => {
    api.setHeaders(headers)
    return api.get(`message/group/${id}`)
  }

  const addMessage = ({ headers, data, id }) => {
    return RNFetchBlob.fetch('POST', `${baseURL}message/group/${id}`, {
      ...headers,
      'Content-Type': 'multipart/form-data'
    }, data)
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    signIn,
    signUp,
    getGroups,
    getFriends,
    searchUsers,
    addFriend,
    addGroup,
    updateUser,
    getGroup,
    updateGroup,
    leaveGroup,
    removeGroup,
    getMessages,
    addMessage
  }
}

export function * callApi (api, arg = {}) {
  const token = yield select(AuthSelectors.selectToken)
  const headers = { 'Authorization': `Bearer ${token}` }
  return yield call(api, { ...arg, headers })
}

// let's return back our create method as the default.
export default {
  create
}
