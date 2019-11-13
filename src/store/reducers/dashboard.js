import * as actionTypes from '../constants/dashboard';
import { updateObject } from '../utility'

const initialState = {
  fetchLoading: false,
  dashboardData: {},
  usersData: []
}

const fetchAirdropDashboardDataStart = (state, action) => {
  return updateObject(state, {
    fetchLoading: true
  })
}

const fetchAirdropDashboardDataFail = (state, action) => {
  return updateObject(state, {
    fetchLoading: false
  })
}

const fetchAirdropDashboardDataSuccess = (state, action) => {
  return updateObject(state, {
    fetchLoading: false,
    usersData: action.payload
  })
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
    case actionTypes.FETCH_AIRDROP_DASHBOARD_DATA_START: return fetchAirdropDashboardDataStart(state, action)
    case actionTypes.FETCH_AIRDROP_DASHBOARD_DATA_FAIL: return fetchAirdropDashboardDataFail(state, action)
    case actionTypes.FETCH_AIRDROP_DASHBOARD_DATA_SUCCESS: return fetchAirdropDashboardDataSuccess(state, action)
    case actionTypes.FETCH_DASHBOARD_DATA_START: return fetchDashboardDataStart(state, action);
    case actionTypes.FETCH_DASHBOARD_DATA_FAIL: return fetchDashboardDataFail(state, action)
    case actionTypes.FETCH_DASHBOARD_DATA_SUCCESS: return fetchDashboardDataSuccess(state, action)
    default: return state
  }
}

export default reducer;