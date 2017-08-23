export const getPostIdsFromTimeline = (state, timeline) =>
  (state.timelines[timeline] && state.timelines[timeline].posts) || []

export const getHasMore = (state, timeline) =>
  (state.timelines[timeline] && state.timelines[timeline].hasMore) || false
