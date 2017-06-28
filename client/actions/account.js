import {
  FETCH_ACCOUNT,
  SAVE_ACCOUNT_FULFILLED,
  SAVE_ACCOUNT_PENDING,
  SAVE_ACCOUNT_REJECTED
} from '.'

export const fetchAccount = () => async (dispatch, getState, api) => {
  try {
    const response = await api('get', 'account')

    dispatch({
      type: FETCH_ACCOUNT,
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
      type: SAVE_ACCOUNT_PENDING
    })

    const response = await api('put', 'account', account)

    dispatch({
      type: SAVE_ACCOUNT_FULFILLED,
      account: response.data
    })

    onSuccess(response.data)
  } catch (err) {
    dispatch({
      type: SAVE_ACCOUNT_REJECTED,
      error: err.response.data.error
    })
  }
}
