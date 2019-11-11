import * as actionTypes from '../constants/auth';
import axios from '../../config/axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error.data.message
  }
}

export const authSuccess = (response) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: response
  }
}

export const authLogout = () => {
  localStorage.removeItem('token');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const auth = (userData, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    axios.post('/auth/login', userData)
      .then((response) => {
        dispatch(authSuccess(response))
        localStorage.setItem('token', response.data.token);
      }).catch((error) => {
        dispatch(authFail(error.response))
      })
  }
}
