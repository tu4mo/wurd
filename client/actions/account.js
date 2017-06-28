import {
  ACCOUNT_FETCH,
  ACCOUNT_SAVE_FULFILLED,
  ACCOUNT_SAVE_PENDING,
  ACCOUNT_SAVE_REJECTED
} from '.'

export const fetchAccount = () => async (dispatch, getState, api) => {
  try {
    const response = await api('get', 'account')

    dispatch({
      type: ACCOUNT_FETCH,
      account: response.data
    })
  } catch (err) {
    // TODO
  }
}

export const saveAccount = (account, onSuccess) => async (
  dispatch,
  getState,
  api
) => {
  try {
    dispatch({
      type: ACCOUNT_SAVE_PENDING
    })

    const response = await api('put', 'account', account)

    dispatch({
      type: ACCOUNT_SAVE_FULFILLED,
      account: response.data
    })

    onSuccess(response.data)
  } catch (err) {
    dispatch({
      type: ACCOUNT_SAVE_REJECTED,
      error: err.response.data.error
    })
  }
}
