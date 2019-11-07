import * as actionTypes from '../constants/user';
import { updateObject } from '../utility'

const initialState = {
  loading: false,
  fetchUsersLoading: false,
  gwxUsers: []
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
    loading: true
  })
}

const createUserFail = (state, action) => {
  return updateObject(state, {
    loading: false
  })
}

const createUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GWX_USERS_START: return fetchGWXUsersStart(state, action)
    case actionTypes.FETCH_GWX_USERS_SUCCESS: return fetchGWXUsersSuccess(state, action)
    case actionTypes.FETCH_GWX_USERS_FAIL: return fetchGWXUsersFail(state, action)
    case actionTypes.CREATE_USER_START: return createUserStart(state, action)
    case actionTypes.CREATE_USER_SUCCESS: return createUserSuccess(state, action)
    case actionTypes.CREATE_USER_FAIL: return createUserFail(state, action)
    default:
      return state
  }
}

export default reducer