import reducer, { TIMELINES_REMOVE_POST } from './timelines'

describe('timelines', () => {
  it('TIMELINES_REMOVE_POST should remove post from home and timelines', () => {
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
