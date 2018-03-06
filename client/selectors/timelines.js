import { EMPTY_ARRAY } from '.'

export const getPostIdsFromTimeline = (state, timeline) =>
  (state.timelines[timeline] && state.timelines[timeline].posts) || EMPTY_ARRAY

export const getHasMore = (state, timeline) =>
  (state.timelines[timeline] && state.timelines[timeline].hasMore) || false
