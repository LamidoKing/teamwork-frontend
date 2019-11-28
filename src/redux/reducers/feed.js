import update from "react-addons-update"

const handleFeed = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      feedData: {
        $set: action.payload
      },
      error: {
        $set: {}
      }
    })
  }
  return update(state, {
    error: {
      $set: action.payload
    },
    feedData: {
      $set: {}
    }
  })
}

const ACTION_HANDLERS = {
  FEED: handleFeed
}

const initialState = {
  feedData: {},
  error: {}
}

const feedReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default feedReducer
