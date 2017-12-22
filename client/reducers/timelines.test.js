import { TIMELINES_REMOVE_POST } from '../actions'
import reducer from './timelines'

describe('timelines', () => {
  it('should handle TIMELINES_REMOVE_POST', () => {
    expect(
      reducer(
        {
          home: {
            hasMore: true,
            posts: [1]
          },
          timeline1: {
            hasMore: true,
            posts: [2, 3]
          },
          timeline2: {
            hasMore: false,
            posts: [1, 2, 3]
          }
        },
        {
          id: 1,
          type: TIMELINES_REMOVE_POST
        }
      )
    ).toEqual({
      home: {
        hasMore: true,
        posts: []
      },
      timeline1: {
        hasMore: true,
        posts: [2, 3]
      },
      timeline2: {
        hasMore: false,
        posts: [2, 3]
      }
    })
  })
})
