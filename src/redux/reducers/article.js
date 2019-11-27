import update from "react-addons-update"

const handlePostArticle = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      articleData: {
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
    articleData: {
      $set: {}
    }
  })
}

const ACTION_HANDLERS = {
  POST_ARTICLE: handlePostArticle
}

const initialState = {
  articleData: {},
  error: {}
}

const articleReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default articleReducer
