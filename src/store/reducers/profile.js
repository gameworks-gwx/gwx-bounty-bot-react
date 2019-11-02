import * as actionTypes from '../constants/profile';
import { updateObject } from '../utility';

const initialState = {
  profiles: [],
  specificProfile: {},
  fetchAllLoading: false,
  error: {},
}

const profileFetchAllStart = (state, action) => {
  return updateObject(state, {
    ...state,
    error: {},
    fetchAllLoading: true,
  })
}

const profileFetchAllSuccess = (state, action) => {
  return updateObject(state, {
    ...state,
    error: {},
    fetchAllLoading: false,
    profiles: action.payload,
  })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_FETCH_ALL_START: return profileFetchAllStart(state, action)
    case actionTypes.PROFILE_FETCH_ALL_SUCCESS: return profileFetchAllSuccess(state, action)
    default: return state
  }
}

export default reducer;