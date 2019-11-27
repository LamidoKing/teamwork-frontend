/* eslint-disable import/prefer-default-export */
import { GET_INPUT } from "./types"

const getInputData = payload => {
  return {
    type: GET_INPUT,
    payload
  }
}

export { getInputData }
