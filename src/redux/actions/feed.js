/* eslint-disable import/prefer-default-export */
import { FEED } from "./types"
import { BASE_URL } from "../constants"
import { Request } from "../../Utils"

const feed = () => async dispatch => {
  try {
    const data = await Request.get(`${BASE_URL}/feed`)

    dispatch({
      type: FEED,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FEED,
      payload: error
    })
  }
}

export { feed }
