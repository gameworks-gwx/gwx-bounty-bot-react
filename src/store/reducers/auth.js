import * as actionTypes from '../constants/auth';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  loading: false,
  error: null
}

const authStart = (state, action) => {
//  console.log("REDUCER AUTH_START")
  return updateObject(state, {
    loading: true
  })
}

const authLogout = (state, action) => {
 // console.log("REDUCER AUTH_LOGOUT")
  return updateObject(state, {
    token: null
  })
}

const authFail = (state, action) => {
  //console.log("REDUCER AUTH_FAIL")
  return updateObject(state, {
    loading: false,
    error: action.payload
  })
}

const authSuccess = (state, action) => {
  //console.log("REDUCER AUTH_SUCCESS")
  //console.log(action.payload);
  return updateObject(state, {
    loading: false,
    token: action.payload
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
