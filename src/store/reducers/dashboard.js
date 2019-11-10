import * as actionTypes from '../constants/dashboard';
import { updateObject } from '../utility'

const initialState = {
  fetchLoading: false,
  dashboardData: {},
}

const fetchDashboardDataStart = (state, action) => {
  return updateObject(state, {
    fetchLoading: true
  })
}

const fetchDashboardDataFail = (state, action) => {
  return updateObject(state, {
    fetchLoading: false
  })
}

const fetchDashboardDataSuccess = (state, action) => {
  return updateObject(state, {
    fetchLoading: false,
    dashboardData: action.payload
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DASHBOARD_DATA_START: return fetchDashboardDataStart(state, action);
    case actionTypes.FETCH_DASHBOARD_DATA_FAIL: return fetchDashboardDataFail(state, action)
    case actionTypes.FETCH_DASHBOARD_DATA_SUCCESS: return fetchDashboardDataSuccess(state, action)
    default: return state
  }
}

export default reducer;