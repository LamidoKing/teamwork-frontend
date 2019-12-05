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

const handleSpecificArticleData = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      specificArticleData: {
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
    specificArticleData: {
      $set: {}
    }
  })
}

const handleEditedArticleData = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      editedArticleData: {
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
    editedArticleData: {
      $set: {}
    }
  })
}

const ACTION_HANDLERS = {
  POST_ARTICLE: handlePostArticle,
  ARTICLE_DATA: handleSpecificArticleData,
  EDITED_ARTICLE_DATA: handleEditedArticleData
}

const initialState = {
  articleData: {},
  specificArticleData: {},
  editedArticleData: {},
  error: {}
}

const articleReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default articleReducer
