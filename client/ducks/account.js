const ACCOUNT_FETCH = 'ACCOUNT/FETCH'
const ACCOUNT_SAVE_PENDING = 'ACCOUNT/SAVE_PENDING'
const ACCOUNT_SAVE_FULFILLED = 'ACCOUNT/SAVE_FULFILLED'
const ACCOUNT_SAVE_REJECTED = 'ACCOUNT/SAVE_REJECTED'

export const fetchAccount = () => async (dispatch, getState, api) => {
  try {
    const response = await api({ method: 'get', url: 'account' })

    dispatch({
      account: response.data,
      type: ACCOUNT_FETCH
    })
  } catch (err) {
    // TODO
  }
}

export const saveAccount = account => async (dispatch, getState, api) => {
  try {
    dispatch({
      type: ACCOUNT_SAVE_PENDING
    })

    const response = await api({
      data: account,
      method: 'put',
      url: 'account'
    })

    dispatch({
      account: response.data,
      type: ACCOUNT_SAVE_FULFILLED
    })

    return response.data
  } catch (err) {
    dispatch({
      error: err.response.data.error,
      type: ACCOUNT_SAVE_REJECTED
    })

    throw err
  }
}

export default (state = {}, action) => {
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
