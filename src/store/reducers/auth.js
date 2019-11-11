import * as actionTypes from '../constants/auth';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  loading: false,
  error: null
}

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload
  })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.payload,
    error: null
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;
