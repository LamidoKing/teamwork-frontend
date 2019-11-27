import update from "react-addons-update"

const handlePostgif = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      gifData: {
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
    gifData: {
      $set: {}
    }
  })
}

const ACTION_HANDLERS = {
  POST_GIF: handlePostgif
}

const initialState = {
  gifData: {},
  error: {}
}

const gifReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default gifReducer
