import {
  ACCOUNT_FETCH,
  ACCOUNT_SAVE_FULFILLED,
  ACCOUNT_SAVE_PENDING,
  ACCOUNT_SAVE_REJECTED
} from '.'

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

export const saveAccount = (account, onSuccess) => async (
  dispatch,
  getState,
  api
) => {
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

    onSuccess(response.data)
  } catch (err) {
    dispatch({
      error: err.response.data.error,
      type: ACCOUNT_SAVE_REJECTED
    })
  }
}
