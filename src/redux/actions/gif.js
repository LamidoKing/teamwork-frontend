/* eslint-disable import/prefer-default-export */
import { POST_GIF, GET_INPUT, GIF_DATA, DELETE_GIF, COMMENT_GIF } from "./types"
import { BASE_URL } from "../constants"
import { Request, history } from "../../Utils"

const postGif = () => async (dispatch, store) => {
  try {
    const { file, title } = await store().general.inputData

    if (!file || !title) {
      const error = {
        fileErr: { status: "error", message: "Upload Gif" },
        titleErr: { status: "error", message: "Input Gif title" }
      }

      if (!file) {
        throw error.fileErr
      }
      throw error.titleErr
    }

    const formData = new FormData()

    formData.append("gif", file)
    formData.append("title", title)

    const data = await Request.postFile(`${BASE_URL}/gifs`, formData)

    dispatch({
      type: POST_GIF,
      payload: data
    })
    dispatch({
      type: GET_INPUT,
      payload: {}
    })

    if (data.data) {
      history.push("/")
    }
  } catch (error) {
    dispatch({
      type: POST_GIF,
      payload: error
    })
  }
}

const getGif = id => async dispatch => {
  try {
    const data = await Request.get(`${BASE_URL}/gifs/${id}`)

    dispatch({
      type: GIF_DATA,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GIF_DATA,
      payload: error
    })
  }
}

const deleteGif = id => async dispatch => {
  try {
    const data = await Request.del(`${BASE_URL}/gifs/${id}`)

    dispatch({
      type: DELETE_GIF,
      payload: data
    })
    if (data.data) {
      history.push("/")
    }
  } catch (error) {
    dispatch({
      type: DELETE_GIF,
      payload: error
    })
  }
}

const commentGifs = id => async (dispatch, store) => {
  try {
    const { commentGif } = await store().general.inputData

    const error = {
      fileErr: { status: "error", message: "input Comment" }
    }

    if (!commentGif) {
      throw error.fileErr
    }

    const data = await Request.post(`${BASE_URL}/gifs/${id}/comment`, {
      comment: commentGif
    })

    dispatch({
      type: COMMENT_GIF,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COMMENT_GIF,
      payload: error
    })
  }
}

export { postGif, getGif, deleteGif, commentGifs }
