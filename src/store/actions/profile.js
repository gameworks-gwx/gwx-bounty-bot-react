import * as actionTypes from '../constants/profile';
import { ADD_ERROR } from '../constants/error'
import axios from '../../config/axios';
import { authHeader } from '../helpers/authHeader';

export const profilePendingFetchStart = () => {
  return {
    type: actionTypes.PROFILE_PENDING_FETCH_START
  }
}

export const profilePendingFetchFail = (error) => {
  console.log(error)
  return {
    type: ADD_ERROR,
    payload: error
  }
}

export const profilePendingFetchSuccess = (response) => {
  console.log(response)
  return {
    type: actionTypes.PROFILE_PENDING_FETCH_SUCCESS,
    payload: response
  }
}

export const profilePendingFetch = () => {
  return dispatch => {
    dispatch(profilePendingFetchStart())

    axios.get('/profiles/pending', {
      headers: authHeader()
    }).then((response) => dispatch(profilePendingFetchSuccess(response.data))
    ).catch((error) => dispatch(profilePendingFetchFail(error)))
  }
}

export const profileFetchAllStart = () => {
  console.log(`ACTIONS PROFILE FETCH ALL START`);
  return {
    type: actionTypes.PROFILE_FETCH_ALL_START
  }
}

export const profileFetchAllFail = (error) => {
  console.log(`ACTIONS PROFILE FETCH ALL FAIL`);
  return {
    type: ADD_ERROR,
    payload: error
  }
}

export const profileFetchAllSuccess = (response) => {
  console.log(`ACTIONS PROFILE FETCH ALL SUCCESS`);
  return {
    type: actionTypes.PROFILE_FETCH_ALL_SUCCESS,
    payload: response.data
  }
}

export const profileFetchAll = () => {
  return dispatch => {
    dispatch(profileFetchAllStart());

    axios.get('/profiles', {
      headers: authHeader()
    }).then((response) => {
      dispatch(profileFetchAllSuccess(response))
    }).catch((error) => {
      dispatch(profileFetchAllFail(error))
    })
  }
}