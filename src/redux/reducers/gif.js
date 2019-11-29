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

const handleSpecificGifData = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      specificGifData: {
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
    specificGifData: {
      $set: {}
    }
  })
}

const ACTION_HANDLERS = {
  POST_GIF: handlePostgif,
  GIF_DATA: handleSpecificGifData
}

const initialState = {
  gifData: {},
  specificGifData: {},
  error: {}
}

const gifReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default gifReducer
