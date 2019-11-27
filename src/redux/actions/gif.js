/* eslint-disable import/prefer-default-export */
import { POST_GIF, GET_INPUT } from "./types"
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

export { postGif }
