import * as actionTypes from '../constants/user'
import { ADD_ERROR } from '../constants/error'
import axios from '../../config/axios';
import { authHeader } from '../helpers/authHeader';

export const createUserStart = () => {
  return {
    type: actionTypes.CREATE_USER_START
  }
}

export const createUserFail = () => {
  return {
    type: actionTypes.CREATE_USER_FAIL,
  }
}

export const addError = (error) => {
  return {
    type: ADD_ERROR,
    payload: error
  }
}

export const createUserSuccess = (response) => {
  console.log(response);
  return {
    type: actionTypes.CREATE_USER_SUCCESS
  }
}

export const createUser = (userData) => {
  return dispatch => {
    dispatch(createUserStart())

    axios.post('/users', userData)
      .then((response) => dispatch(createUserSuccess(response.data)))
      .catch((error) => {
        dispatch(createUserFail())
        dispatch(addError(error))
      })
  }
}