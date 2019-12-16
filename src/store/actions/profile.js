import * as actionTypes from '../constants/profile';
import { ADD_ERROR } from '../constants/error'
import axios from '../../config/axios';
import { authHeader } from '../helpers/authHeader';

export const addError = (error) => {
  return {
    type: ADD_ERROR,
    payload: error
  }
}

export const searchProfileStart = () => {
  return {
    type: actionTypes.SEARCH_PROFILE_START
  }
}

export const searchProfileFail = () => {
  return {
    type: actionTypes.SEARCH_PROFILE_FAIL
  }
}

export const searchProfileSuccess = (response) => {
  return {
    type: actionTypes.SEARCH_PROFILE_SUCCESS,
    payload: response
  }
}

export const searchProfile = (query) => {
  return dispatch => {
    dispatch(searchProfileStart());

    axios.get(`/profiles/search?q=${query}&page=1&limit=20`, {
      headers: authHeader()
    }).then((response) => dispatch(searchProfileSuccess(response.data)))
      .catch((error) => {
        dispatch(searchProfileFail())
        dispatch(addError(error))
      })
  }
}

export const profileVerifyScreenshotStart = () => {
  return {
    type: actionTypes.PROFILE_VERIFY_SCREENSHOT_START
  }
}


export const profileVerifyScreenshotFail = () => {
  return {
    type: actionTypes.PROFILE_VERIFY_SCREENSHOT_FAIL
  }
}

export const profileVerifyScreenshotSuccess = (message, id, taskNumber) => {
  return {
    type: actionTypes.PROFILE_VERIFY_SCREENSHOT_SUCCESS,
    payload: {
      message,
      id,
      taskNumber
    }
  }
}

export const profileVerifyScreenshot = (id, body) => {
  return dispatch => {
    dispatch(profileVerifyScreenshotStart())

    axios.put(`/profiles/verify/${id}`, body, {
      headers: authHeader()
    }).then((response) => dispatch(profileVerifyScreenshotSuccess(response.data, id, body.taskNumber)))
      .catch((error) => {
        dispatch(profileVerifyScreenshotFail())
        dispatch(addError(error))
      })
  }
}

export const profilePendingFetchStart = () => {
  return {
    type: actionTypes.PROFILE_PENDING_FETCH_START
  }
}

export const profilePendingFetchFail = () => {
  return {
    type: actionTypes.PROFILE_PENDING_FETCH_FAIL,
  }
}

export const profilePendingFetchSuccess = (response) => {
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
    ).catch((error) => {
      dispatch(profilePendingFetchFail())
      dispatch(addError(error))
    })
  }
}

export const fetchProfileStart = () => {
  return {
    type: actionTypes.FETCH_PROFILE_START
  }
}

export const fetchProfileFail = () => {
  return {
    type: actionTypes.FETCH_PROFILE_FAIL,
  }
}

export const fetchProfileSuccess = (response) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    payload: response
  }
}

export const fetchProfile = (id) => {
  return dispatch => {
    dispatch(fetchProfileStart());

    axios.get(`/profiles/${id}`, {
      headers: authHeader()
    }).then((response) => dispatch(fetchProfileSuccess(response.data))).catch((error) => {
      dispatch(profileFetchAllFail())
      dispatch(addError(error))
    })
  }
}

export const profileFetchAllStart = () => {
  return {
    type: actionTypes.PROFILE_FETCH_ALL_START
  }
}

export const profileFetchAllFail = () => {
  return {
    type: actionTypes.PROFILE_FETCH_ALL_FAIL,
  }
}

export const profileFetchAllSuccess = (response) => {
  return {
    type: actionTypes.PROFILE_FETCH_ALL_SUCCESS,
    payload: response
  }
}

export const profileFetchAll = (page) => {
  return dispatch => {
    dispatch(profileFetchAllStart());

    axios.get(`/profiles?page=${page}&limit=20`, {
      headers: authHeader()
    }).then((response) => {
      dispatch(profileFetchAllSuccess(response.data))
    }).catch((error) => {
      dispatch(profileFetchAllFail())
      dispatch(addError(error))
    })
  }
}