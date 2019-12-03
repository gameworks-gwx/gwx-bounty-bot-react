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

export const searchUsersStart = () => {
  return {
    type: actionTypes.SEARCH_USERS_START
  }
}

export const searchUsersFail = () => {
  return {
    type: actionTypes.SEARCH_USERS_FAIL
  }
}

export const searchUsersSuccess = (response) => {
  return {
    type: actionTypes.SEARCH_USERS_SUCCESS,
    payload: response
  }
}

export const searchUsers = (query, page) => {
  return dispatch => {
    dispatch(searchUsersStart())

    axios.get(`/dashboard/search?q=${query}&page=${page}&limit=20`, {
      headers: authHeader()
    }).then((response) => dispatch(searchUsersSuccess(response.data)))
      .catch((error) => {
        dispatch(searchUsersFail())
        dispatch(addError(error))
      })
  }
}

export const fetchSpecificLedgerStart = () => {
  return {
    type: actionTypes.FETCH_SPECIFIC_LEDGER_START
  }
}

export const fetchSpecificLedgerFail = () => {
  return {
    type: actionTypes.FETCH_SPECIFIC_LEDGER_FAIL
  }
}

export const fetchSpecificLedgerSuccess = (response) => {
  return {
    type: actionTypes.FETCH_SPECIFIC_LEDGER_SUCCESS,
    payload: response
  }
}

export const fetchSpecificLedger = (date) => {
  return dispatch => {
    dispatch(fetchSpecificLedgerStart());

    axios.get(`/dashboard/airdrop/ledger/${date}`, {
      headers: authHeader()
    }).then((response) => dispatch(fetchSpecificLedgerSuccess(response.data)))
      .catch((error) => {
        dispatch(fetchSpecificLedgerFail())
        dispatch(addError(error))
      })
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
    payload: {
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

export const airdropUser = (airdropType, body) => {
  return dispatch => {
    const { walletAddress } = body;
    dispatch(airdropUserStart(airdropType, walletAddress))

    axios.put(`/dashboard/airdrop`, body, {
      headers: authHeader()
    }).then((response) => dispatch(airdropUserSuccess(response.data, airdropType, walletAddress)))
      .catch((error) => {
        dispatch(airdropUserFail(airdropType, walletAddress))
        dispatch(addError(error))
      })
  }
}

export const airdropAllUsers = (users, date, count) => {
  return dispatch => {
    if (users.length > count) {
      const { email, wallet_address, tasks, air_drop_created_at } = users[count]
      const body = {
        date,
        email: email ? email : 'Unregistered',
        walletAddress: wallet_address,
        air_drop_created_at: air_drop_created_at || ''
      }

      if (users[count].telegramId) {
        const verifiedTasks = tasks.filter((task) => task.verified !== false)
        const verifiedTaskTokens = verifiedTasks.length * 600

        dispatch(airdropUserStart('telegram', wallet_address))

        axios.put(`/dashboard/airdrop`, { ...body, tokensDisbursed: verifiedTaskTokens, isTelegram: true }, {
          headers: authHeader()
        }).then((response) => {
          dispatch(airdropUserSuccess(response.data, 'telegram', wallet_address))
          dispatch(airdropUserStart('gwx', wallet_address))

          axios.put(`/dashboard/airdrop`, { ...body, tokensDisbursed: 600 }, {
            headers: authHeader(),
          }).then((response) => {
            dispatch(airdropUserSuccess(response.data, 'gwx', wallet_address))
            dispatch(airdropAllUsers(users, date, count + 1))
          }).catch((error) => {
            dispatch(airdropUserFail('gwx', wallet_address))
            dispatch(airdropAllUsers(users, date, count + 1))
            dispatch(addError(error))
          })

        }).catch((error) => {
          dispatch(addError(error))
          dispatch(airdropUserFail('telegram', wallet_address))
          dispatch(airdropUserStart('gwx', wallet_address))

          axios.put(`/dashboard/airdrop`, { ...body, tokensDisbursed: 600 }, {
            headers: authHeader(),
          }).then((response) => {
            dispatch(airdropUserSuccess(response.data, 'gwx', wallet_address))
            dispatch(airdropAllUsers(users, date, count + 1))
          }).catch((error) => {
            dispatch(addError(error))
            dispatch(airdropUserFail('gwx', wallet_address))
            dispatch(airdropAllUsers(users, date, count + 1))
          })

        })

      } else {
        dispatch(airdropUserStart('gwx', wallet_address))

        axios.put(`/dashboard/airdrop`, { ...body, tokensDisbursed: 600 }, {
          headers: authHeader()
        }).then((response) => {
          dispatch(airdropUserSuccess(response.data, 'gwx', wallet_address))
          dispatch(airdropAllUsers(users, date, count + 1))
        }).catch((error) => {
          dispatch(addError(error))
          dispatch(airdropUserFail('gwx', wallet_address))
          dispatch(airdropAllUsers(users, date, count + 1))
        })

      }
    }
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