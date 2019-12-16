import * as actionTypes from '../constants/error';
import { updateObject } from '../helpers/utility';

const initialState = {
  error: ''
}

const addError = (state, action) => {
  if (action.payload.response) {
    const { status = '', data = '' } = action.payload.response;
    const message = data.message
    return updateObject(state, {
      error: {
        status,
        message
      }
    })
  } else {
    return updateObject(state, {
      error: action.payload
    })
  }
}

const removeError = (state, action) => {
  return updateObject(state, {
    error: ''
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ERROR: return addError(state, action)
    case actionTypes.REMOVE_ERROR: return removeError(state, action)
    default: return state
  }
}

export default reducer