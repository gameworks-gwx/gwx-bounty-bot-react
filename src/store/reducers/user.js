import * as actionTypes from '../constants/user';
import { updateObject } from '../helpers/utility'

const initialState = {
  loading: false,
  fetchUsersLoading: false,
  gwxUsers: [],
  users: [],
  user: {},
  messageData: '',
  deleteLoading: false
}

const deleteUserStart = (state, action) => {
  return updateObject(state, {
    deleteLoading: true,
    messageData: ''
  })
}

const deleteUserFail = (state, action) => {
  return updateObject(state, {
    deleteLoading: false
  })
}

const deleteUserSuccess = (state, action) => {
  return updateObject(state, {
    deleteLoading: false,
    users: state.users.filter((user) => user.id !== action.payload)
  })
}

const fetchUsersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    messageData: ''
  })
}

const fetchUsersFail = (state, action) => {
  return updateObject(state, {
    loading: false
  })
}

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    users: action.payload.users
  })
}

const fetchGWXUsersStart = (state, action) => {
  return updateObject(state, {
    fetchUsersLoading: true
  })
}

const fetchGWXUsersFail = (state, action) => {
  return updateObject(state, {
    fetchUsersLoading: false
  })
}

const fetchGWXUsersSuccess = (state, action) => {
  return updateObject(state, {
    fetchUsersLoading: false,
    gwxUsers: action.payload
  })
}

const createUserStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  })
}

const createUserFail = (state, action) => {
  return updateObject(state, {
    loading: false
  })
}

const createUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    messageData: {
      code: 0,
      message: 'User created successfully!'
    }
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_USER_START: return deleteUserStart(state, action)
    case actionTypes.DELETE_USER_SUCCESS: return deleteUserSuccess(state, action)
    case actionTypes.DELETE_USER_FAIL: return deleteUserFail(state, action)
    case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action)
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action)
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action)
    case actionTypes.FETCH_GWX_USERS_START: return fetchGWXUsersStart(state, action)
    case actionTypes.FETCH_GWX_USERS_SUCCESS: return fetchGWXUsersSuccess(state, action)
    case actionTypes.FETCH_GWX_USERS_FAIL: return fetchGWXUsersFail(state, action)
    case actionTypes.CREATE_USER_START: return createUserStart(state, action)
    case actionTypes.CREATE_USER_SUCCESS: return createUserSuccess(state, action)
    case actionTypes.CREATE_USER_FAIL: return createUserFail(state, action)
    default: return state
  }
}

export default reducer