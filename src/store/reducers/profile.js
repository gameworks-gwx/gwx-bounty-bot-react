import * as actionTypes from '../constants/profile';
import { updateObject } from '../helpers/utility';

const initialState = {
  profiles: [],
  pendingProfiles: [],
  specificProfile: {},
  fetchAllLoading: false,
  loadingVerify: false,
  loading: false,
  error: {},
}

const searchProfileStart = (state, action) => {
  return updateObject(state, {
    ...state,
    fetchAllLoading: true
  })
}

const searchProfileSuccess = (state, action) => {
  return updateObject(state, {
    ...state,
    fetchAllLoading: false,
    profiles: action.payload
  })
}

const searchProfileFail = (state, action) => {
  return updateObject(state, {
    ...state,
    loading: false
  })
}

const fetchProfileStart = (state, action) => {
  return updateObject(state, {
    ...state,
    loading: true
  })
}

const fetchProfileSuccess = (state, action) => {
  return updateObject(state, {
    ...state,
    loading: false,
    specificProfile: action.payload
  })
}

const fetchProfileFail = (state, action) => {
  return updateObject(state, {
    ...state,
    loading: false
  })
}

const profileVerifyScreenshotStart = (state, action) => {
  return updateObject(state, {
    ...state,
    loadingVerify: true
  })
}

const profileVerifyScreenshotSuccess = (state, action) => {
  const { id, taskNumber } = action.payload;
  return updateObject(state, {
    ...state,
    loadingVerify: false,
    pendingProfiles: state.pendingProfiles.map((profile) => {
      if (profile._id === id) {
        profile.tasks = profile.tasks.filter((task) => {
          return task.taskNumber !== taskNumber
        })
      }
      return profile
    })
  })
}

const profileVerifyScreenshotFail = (state, action) => {
  return updateObject(state, {
    ...state,
    loadingVerify: false
  })
}

const profilePendingFetchStart = (state, action) => {
  return updateObject(state, {
    ...state,
    fetchAllLoading: true
  })
}

const profilePendingFetchSuccess = (state, action) => {
  return updateObject(state, {
    ...state,
    fetchAllLoading: false,
    pendingProfiles: action.payload
  })
}

const profilePendingFetchFail = (state, action) => {
  return updateObject(state, {
    ...state,
    fetchAllLoading: false,
  })
}

const profileFetchAllStart = (state, action) => {
  return updateObject(state, {
    ...state,
    error: {},
    fetchAllLoading: true,
    specificProfile: {}
  })
}

const profileFetchAllSuccess = (state, action) => {
  return updateObject(state, {
    ...state,
    fetchAllLoading: false,
    profiles: action.payload,
  })
}

const profileFetchAllFail = (state, action) => {
  return updateObject(state, {
    ...state,
    fetchAllLoading: false,
  })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SEARCH_PROFILE_START: return searchProfileStart(state, action)
    case actionTypes.SEARCH_PROFILE_SUCCESS: return searchProfileSuccess(state, action)
    case actionTypes.SEARCH_PROFILE_FAIL: return searchProfileFail(state, action)
    case actionTypes.FETCH_PROFILE_START: return fetchProfileStart(state, action)
    case actionTypes.FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action)
    case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action)
    case actionTypes.PROFILE_FETCH_ALL_START: return profileFetchAllStart(state, action)
    case actionTypes.PROFILE_FETCH_ALL_SUCCESS: return profileFetchAllSuccess(state, action)
    case actionTypes.PROFILE_FETCH_ALL_FAIL: return profileFetchAllFail(state, action)
    case actionTypes.PROFILE_PENDING_FETCH_START: return profilePendingFetchStart(state, action)
    case actionTypes.PROFILE_PENDING_FETCH_SUCCESS: return profilePendingFetchSuccess(state, action)
    case actionTypes.PROFILE_PENDING_FETCH_FAIL: return profilePendingFetchFail(state, action)
    case actionTypes.PROFILE_VERIFY_SCREENSHOT_START: return profileVerifyScreenshotStart(state, action)
    case actionTypes.PROFILE_VERIFY_SCREENSHOT_SUCCESS: return profileVerifyScreenshotSuccess(state, action)
    case actionTypes.PROFILE_VERIFY_SCREENSHOT_FAIL: return profileVerifyScreenshotFail(state, action)
    default: return state
  }
}

export default reducer;