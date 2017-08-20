export const getPage = (state, id) =>
  (state.pagination[id] && state.pagination[id].page) || 0
