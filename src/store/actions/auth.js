import * as actionTypes from '../constants/auth';
import axios from '../../config/axios';

export const authStart = () => {
  console.log(`ACTIONS AUTH START`);
  return {
    type: actionTypes.AUTH_START
  }
}

export const authFail = (error) => {
  console.log('ACTIONS AUTH FAIL');

  const { message } = error.response.data;

  console.log(message);
  return {
    type: actionTypes.AUTH_FAIL,
    payload: message
  }
}

export const authSuccess = (response) => {
  console.log('ACTIONS AUTH SUCCESS');
  const { token } = response.data;
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: token
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
        dispatch(authFail(error))
      })
  }
}