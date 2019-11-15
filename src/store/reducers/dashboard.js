import * as actionTypes from '../constants/dashboard';
import { updateObject } from '../utility'

const initialState = {
  fetchLoading: false,
  dashboardData: {},
  usersData: [],
  gwxLoading: [],
  telegramLoading: [],
  successAirdroppedGwxUsers: [],
  failedAirdroppedGwxUsers: [],
  successAirdroppedTelegramUsers: [],
  failedAirdroppedTelegramUsers: [],
  message: null
}

const airdropUserStart = (state, action) => {
  const { airdropType, walletAddress } = action.payload

  if (airdropType === 'gwx') {
    return updateObject(state, {
      gwxLoading: state.gwxLoading.concat(walletAddress)
    })
  } else {
    return updateObject(state, {
      telegramLoading: state.telegramLoading.concat(walletAddress)
    })
  }
}

const airdropUserFail = (state, action) => {
  const { airdropType, walletAddress } = action.payload

  if (airdropType === 'gwx') {
    return updateObject(state, {
      gwxLoading: state.gwxLoading.filter((gwxAddress) => gwxAddress !== walletAddress),
      failedAirdroppedGwxUsers: state.failedAirdroppedGwxUsers.concat(walletAddress)
    })
  } else {
    return updateObject(state, {
      telegramLoading: state.telegramLoading.filter((telegramAddress) => telegramAddress !== walletAddress),
      failedAirdroppedTelegramUsers: state.failedAirdroppedTelegramUsers.concat(walletAddress)
    })
  }
}

const airdropUserSuccess = (state, action) => {
  const { airdropType, walletAddress } = action.payload

  if (airdropType === 'gwx') {
    return updateObject(state, {
      gwxLoading: state.gwxLoading.filter((gwxAddress) => gwxAddress !== walletAddress),
      message: `Successfully airdropped to ${walletAddress}`,
      successAirdroppedGwxUsers: state.successAirdroppedGwxUsers.concat(walletAddress)
    })
  } else {
    return updateObject(state, {
      telegramLoading: state.telegramLoading.filter((telegramAddress) => telegramAddress !== walletAddress),
      message: `Successfully airdropped to ${walletAddress}`,
      successAirdroppedTelegramUsers: state.successAirdroppedTelegramUsers.concat(walletAddress)
    })
  }
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
    case actionTypes.AIRDROP_USER_START: return airdropUserStart(state, action)
    case actionTypes.AIRDROP_USER_FAIL: return airdropUserFail(state, action)
    case actionTypes.AIRDROP_USER_SUCCESS: return airdropUserSuccess(state, action)
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