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

const handleDeleterticle = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      deleteArticle: {
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
    deleteArticle: {
      $set: {}
    }
  })
}

const handleCommentAticle = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      commentData: {
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
    commentData: {
      $set: {}
    }
  })
}

const handleFlagAticle = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      flagArticleData: {
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
    flagArticleData: {
      $set: {}
    }
  })
}

const handleFlagAticleComment = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      flagArticleCommentData: {
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
    flagArticleCommentData: {
      $set: {}
    }
  })
}

const ACTION_HANDLERS = {
  POST_ARTICLE: handlePostArticle,
  ARTICLE_DATA: handleSpecificArticleData,
  EDITED_ARTICLE_DATA: handleEditedArticleData,
  DELETE_ARTICLE: handleDeleterticle,
  COMMENT_ARTICLE: handleCommentAticle,
  FLAG_ARTICLE: handleFlagAticle,
  FLAG_ARTICLE_COMMENT: handleFlagAticleComment
}

const initialState = {
  articleData: {},
  specificArticleData: {},
  editedArticleData: {},
  deleteArticle: {},
  commentData: {},
  flagArticleData: {},
  flagArticleCommentData: {},
  error: {}
}

const articleReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default articleReducer
