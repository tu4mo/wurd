import {
  ACCOUNT_FETCH,
  ACCOUNT_SAVE_FULFILLED,
  ACCOUNT_SAVE_PENDING,
  ACCOUNT_SAVE_REJECTED
} from '../actions'

const auth = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_FETCH:
    case ACCOUNT_SAVE_FULFILLED:
      return action.account

    case ACCOUNT_SAVE_PENDING:
      return {
        ...state,
        error: null,
        isSaving: true
      }

    case ACCOUNT_SAVE_REJECTED:
      return {
        ...state,
        error: action.error,
        isSaving: false
      }

    default:
      return state
  }
}

export default auth
