import { PAGE_SET } from '.'

export const setPage = (id, page) => ({
  type: PAGE_SET,
  id,
  page
})
