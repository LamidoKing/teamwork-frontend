/* eslint-disable import/prefer-default-export */
import {
  POST_ARTICLE,
  ARTICLE_DATA,
  EDITED_ARTICLE_DATA,
  DELETE_ARTICLE,
  COMMENT_ARTICLE,
  FLAG_ARTICLE,
  FLAG_ARTICLE_COMMENT
} from "./types"
import { BASE_URL } from "../constants"
import { Request, history } from "../../Utils"

const postArticle = () => async (dispatch, store) => {
  try {
    const { article, articleTitle } = await store().general.inputData

    if (!article || !articleTitle) {
      const error = {
        fileErr: { status: "error", message: "input Article content" },
        titleErr: { status: "error", message: "Input Article title" }
      }

      if (!article) {
        throw error.fileErr
      }
      throw error.titleErr
    }

    const data = await Request.post(`${BASE_URL}/articles`, {
      article,
      title: articleTitle
    })

    dispatch({
      type: POST_ARTICLE,
      payload: data
    })
    if (data.data) {
      history.push("/")
    }
  } catch (error) {
    dispatch({
      type: POST_ARTICLE,
      payload: error
    })
  }
}

const getArticle = id => async dispatch => {
  try {
    const data = await Request.get(`${BASE_URL}/articles/${id}`)

    dispatch({
      type: ARTICLE_DATA,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ARTICLE_DATA,
      payload: error
    })
  }
}

const editArticle = id => async (dispatch, store) => {
  try {
    const { CurrentTitle, CurrentArticle } = await store().general.inputData

    const { article, title } = await store().article.specificArticleData.data

    const editedData = {
      title: !CurrentTitle ? title : CurrentTitle,
      article: !CurrentArticle ? article : CurrentArticle
    }

    const data = await Request.patch(`${BASE_URL}/articles/${id}`, {
      ...editedData
    })

    dispatch({
      type: EDITED_ARTICLE_DATA,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: EDITED_ARTICLE_DATA,
      payload: error
    })
  }
}

const deleteArticle = id => async dispatch => {
  try {
    const data = await Request.del(`${BASE_URL}/articles/${id}`)

    dispatch({
      type: DELETE_ARTICLE,
      payload: data
    })
    if (data.data) {
      history.push("/")
    }
  } catch (error) {
    dispatch({
      type: DELETE_ARTICLE,
      payload: error
    })
  }
}

const commentArticle = id => async (dispatch, store) => {
  try {
    const { comment } = await store().general.inputData

    const error = {
      fileErr: { status: "error", message: "input Comment" }
    }

    if (!comment) {
      throw error.fileErr
    }

    const data = await Request.post(`${BASE_URL}/articles/${id}/comment`, {
      comment
    })

    dispatch({
      type: COMMENT_ARTICLE,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COMMENT_ARTICLE,
      payload: error
    })
  }
}

const flagArticle = (id, userId, flag, articleId) => async (
  dispatch,
  store
) => {
  try {
    const { flagArticleData, specificArticleData } = await store().article

    const error = {
      articleError: {
        status: "error",
        message: "You Already Flag This Article"
      }
    }

    if (
      flagArticleData.data &&
      flagArticleData.data.article === specificArticleData.data.article
    ) {
      throw error.articleError
    }

    const data = await Request.post(`${BASE_URL}/articles/${id}/flag`, {
      userId,
      flag,
      articleId
    })

    dispatch({
      type: FLAG_ARTICLE,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FLAG_ARTICLE,
      payload: error
    })
  }
}

const flagArticleComment = (id, userId, flag, commentId) => async (
  dispatch,
  store
) => {
  try {
    const { flagArticleCommentData, specificArticleData } = await store()
      .article

    const error = {
      articleCommentError: {
        status: "error",
        message: "You Already Flag This Comment"
      }
    }

    if (flagArticleCommentData.data) {
      const isArticle = specificArticleData.data.comments.find(
        comment => comment.commentId === commentId
      )
      if (flagArticleCommentData.data.comment === isArticle.comment) {
        throw error.articleCommentError
      }
    }

    const data = await Request.post(
      `${BASE_URL}/articles/${id}/comment/${commentId}/flag`,
      {
        userId,
        flag,
        commentId
      }
    )

    dispatch({
      type: FLAG_ARTICLE_COMMENT,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FLAG_ARTICLE_COMMENT,
      payload: error
    })
  }
}

export {
  postArticle,
  getArticle,
  editArticle,
  deleteArticle,
  commentArticle,
  flagArticle,
  flagArticleComment
}
