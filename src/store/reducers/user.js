import * as actionTypes from '../constants/user';
import { updateObject } from '../utility'

const initialState = {
  loading: false
}

const createUserStart = (state, action) => {
  return updateObject(state, {
    loading: true
  })
}

const createUserFail = (state, action) => {
  return updateObject(state, {
    loading: false
  })
}

const createUserSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_START: return createUserStart(state, action)
    case actionTypes.CREATE_USER_SUCCESS: return createUserSuccess(state, action)
    case actionTypes.CREATE_USER_FAIL: return createUserFail(state, action)
    default:
      return state
  }
}

export default reducer