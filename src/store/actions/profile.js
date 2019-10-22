import * as actionTypes from '../constants/profile';
import axios from '../../config/axios';
import { authHeader } from '../helpers/authHeader';

export const profileFetchAllStart = () => {
  console.log(`ACTIONS PROFILE FETCH ALL START`);
  return {
    type: actionTypes.PROFILE_FETCH_ALL_START
  }
}

export const profileFetchAllFail = (error) => {
  console.log(`ACTIONS PROFILE FETCH ALL FAIL`);
  return {
    type: actionTypes.PROFILE_FETCH_ALL_FAIL,
    payload: error.response
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