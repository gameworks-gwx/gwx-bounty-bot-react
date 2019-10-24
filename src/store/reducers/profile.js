import * as actionTypes from '../constants/profile';
import { updateObject } from '../utility';

const initialState = {
  profiles: [],
  specificProfile: {},
  fetchAllLoading: false,
  fetchAllError: null
}

const profileFetchAllStart = (state, action) => {
  return updateObject(state, {
    ...state,
    fetchAllLoading: true
  })
}

const profileFetchAllFail = (state, action) => {

  const { status } = action.payload;
  const { message } = action.payload.data
  return updateObject(state, {
    ...state,
    fetchAllLoading: false,
    fetchAllError: { message, status }
  })
}

const profileFetchAllSuccess = (state, action) => {
  return updateObject(state, {
    ...state,
    fetchAllLoading: false,
    profiles: action.payload
  })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_FETCH_ALL_START: return profileFetchAllStart(state, action)
    case actionTypes.PROFILE_FETCH_ALL_FAIL: return profileFetchAllFail(state, action)
    case actionTypes.PROFILE_FETCH_ALL_SUCCESS: return profileFetchAllSuccess(state, action)
    default: return state
  }
}

export default reducer;