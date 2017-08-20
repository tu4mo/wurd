import { PAGE_SET } from '~/actions'

const pagination = (state = {}, action) => {
  switch (action.type) {
    case PAGE_SET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          page: action.page
        }
      }

    default:
      return state
  }
}

export default pagination
