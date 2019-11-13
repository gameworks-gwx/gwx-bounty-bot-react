import axios from '../../config/axios';
import * as actionTypes from '../constants/dashboard';
import { ADD_ERROR } from '../constants/error';
import { authHeader } from '../helpers/authHeader';

export const addError = (error) => {
  return {
    type: ADD_ERROR,
    payload: error
  }
}

export const airdropUserStart = (airdropType, walletAddress) => {
  return {
    type: actionTypes.AIRDROP_USER_START,
    payload: {
      airdropType,
      walletAddress
    }
  }
}

export const airdropUserFail = (airdropType, walletAddress) => {
  return {
    type: actionTypes.AIRDROP_USER_FAIL,
    paylaod: {
      airdropType,
      walletAddress
    }
  }
}

export const airdropUserSuccess = (response, airdropType, walletAddress) => {
  return {
    type: actionTypes.AIRDROP_USER_SUCCESS,
    payload: {
      airdropType,
      walletAddress
    }
  }
}

export const airdropUser = (airdropType, walletAddress) => {
  return dispatch => {
    dispatch(airdropUserStart(airdropType, walletAddress))

    setTimeout(() => {
      dispatch(airdropUserSuccess('boo', airdropType, walletAddress))
    }, 5000)
  }
}

export const fetchAirdropDashboardDataStart = () => {
  return {
    type: actionTypes.FETCH_AIRDROP_DASHBOARD_DATA_START
  }
}

export const fetchAirdropDashboardDataFail = () => {
  return {
    type: actionTypes.FETCH_AIRDROP_DASHBOARD_DATA_FAIL
  }
}

export const fetchAirdropDashboardDataSuccess = (response) => {
  return {
    type: actionTypes.FETCH_AIRDROP_DASHBOARD_DATA_SUCCESS,
    payload: response
  }
}

export const fetchAirdropDashboardData = (page) => {
  return dispatch => {
    dispatch(fetchAirdropDashboardDataStart())

    axios.get(`/dashboard/users?page=${page}&limit=20`, {
      headers: authHeader()
    }).then((response) => dispatch(fetchAirdropDashboardDataSuccess(response.data)))
      .catch((error) => {
        dispatch(fetchAirdropDashboardDataFail())
        dispatch(addError(error))
      })
  }
}

export const fetchDashboardDataStart = () => {
  return {
    type: actionTypes.FETCH_DASHBOARD_DATA_START
  }
}

export const fetchDashboardDataFail = () => {
  return {
    type: actionTypes.FETCH_DASHBOARD_DATA_FAIL
  }
}

export const fetchDashboardDataSuccess = (response) => {
  return {
    type: actionTypes.FETCH_DASHBOARD_DATA_SUCCESS,
    payload: response
  }
}

export const fetchDashboardData = () => {
  return dispatch => {
    dispatch(fetchDashboardDataStart())

    axios.get('/dashboard', {
      headers: authHeader()
    }).then((response) => dispatch(fetchDashboardDataSuccess(response.data)))
      .catch((error) => {
        dispatch(fetchDashboardDataFail())
        dispatch(addError(error))
      })
  }
}