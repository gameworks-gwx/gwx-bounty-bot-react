import * as actionTypes from '../constants/user'
import { ADD_ERROR } from '../constants/error'
import axios from '../../config/axios';
import { authHeader } from '../helpers/authHeader';

export const addError = (error) => {
  return {
    type: ADD_ERROR,
    payload: error
  }
}

export const deleteUserStart = () => {
  return {
    type: actionTypes.DELETE_USER_START
  }
}

export const deleteUserFail = () => {
  return {
    type: actionTypes.DELETE_USER_FAIL
  }
}

export const deleteUserSuccess = (userId) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    payload: userId
  }
}

export const deleteUser = (userId) => {
  return dispatch => {
    dispatch(deleteUserStart())

    axios.delete(`/users/${userId}`, {
      headers: authHeader()
    }).then((response) => dispatch(deleteUserSuccess(userId)))
      .catch((error) => {
        console.log(error);
        dispatch(deleteUserFail())
        dispatch(addError(error))
      })
  }
}

export const fetchGWXUsersStart = () => {
  return {
    type: actionTypes.FETCH_GWX_USERS_START
  }
}

export const fetchGWXUsersFail = () => {
  return {
    type: actionTypes.FETCH_GWX_USERS_FAIL
  }
}

export const fetchGWXUsersSuccess = (data) => {
  return {
    type: actionTypes.FETCH_GWX_USERS_SUCCESS,
    payload: data
  }
}

export const fetchGWXUsers = (page) => {
  return dispatch => {
    dispatch(fetchGWXUsersStart())

    axios.get(`/gwx/users?page=${page}&limit=15`, {
      headers: authHeader()
    }).then((response) => dispatch(fetchGWXUsersSuccess(response.data))).catch((error) => {
      dispatch(fetchGWXUsersFail())
      dispatch(addError(error))
    })
  }
}

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  }
}

export const fetchUsersFail = () => {
  return {
    type: actionTypes.FETCH_USERS_FAIL
  }
}

export const fetchUsersSuccess = (response) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload: response
  }
}

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersStart())

    axios.get('/users', {
      headers: authHeader()
    }).then((response) => dispatch(fetchUsersSuccess(response.data)))
      .catch((error) => {
        dispatch(fetchUsersFail())
        dispatch(addError(error))
      })
  }
}

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START
  }
}

export const fetchUserFail = () => {
  return {
    type: actionTypes.FETCH_USER_FAIL
  }
}

export const fetchUserSuccess = (response) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    payload: response
  }
}

export const fetchUser = (id) => {
  return dispatch => {
    dispatch(fetchUsersStart())

    axios.get(`/users/${id}`, {
      headers: authHeader()
    }).then((response) => dispatch(fetchUsersSuccess(response.data)))
      .catch((error) => {
        dispatch(fetchUsersFail())
        dispatch(addError(error))
      })
  }
}

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

export const createUserSuccess = (response) => {
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