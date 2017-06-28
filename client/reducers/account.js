import {
  FETCH_ACCOUNT,
  SAVE_ACCOUNT_FULFILLED,
  SAVE_ACCOUNT_PENDING,
  SAVE_ACCOUNT_REJECTED
} from '~/actions'

const auth = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT:
    case SAVE_ACCOUNT_FULFILLED:
      return action.account

    case SAVE_ACCOUNT_PENDING:
      return {
        ...state,
        error: null,
        isSaving: true
      }

    case SAVE_ACCOUNT_REJECTED:
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
