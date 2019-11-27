/* eslint-disable import/prefer-default-export */
import { POST_ARTICLE } from "./types"
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

export { postArticle }
