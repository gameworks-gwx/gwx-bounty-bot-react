import * as actionTypes from '../constants/auth';
import axios from '../../config/axios';
import { ADD_ERROR } from '../constants/error'
import { authHeader } from '../helpers/authHeader';

export const addError = (error) => {
  return {
    type: ADD_ERROR,
    payload: error
  }
}

export const authInitStart = () => {
  return {
    type: actionTypes.AUTH_INIT_START
  }
}

export const authInitFail = () => {
  return {
    type: actionTypes.AUTH_INIT_FAIL
  }
}

export const authInitSuccess = (response) => {
  return {
    type: actionTypes.AUTH_INIT_SUCCESS,
    payload: response
  }
}

export const authInit = () => {
  return dispatch => {
    dispatch(authInitStart())

    axios.get(`/auth/init`, {
      headers: authHeader()
    }).then((response) => dispatch(authInitSuccess(response.data)))
      .catch((error) => {
        dispatch(authInitFail())
        dispatch(addError(error))
      })
  }
}

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
