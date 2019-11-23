/* eslint-disable import/prefer-default-export */
import { GET_INPUT, SIGN_IN } from "./types"
import { BASE_URL } from "../constants"
import { Request, AuthToken, history } from "../../Utils"

const getInputData = payload => {
  return {
    type: GET_INPUT,
    payload
  }
}

const signIn = () => async (dispatch, store) => {
  try {
    const { email, password } = await store().user.inputData

    if (!email || !password) {
      const error = {
        emailErr: { status: "error", error: "Input Your Email" },
        passworErr: { status: "error", error: "Input Your Password" }
      }
      if (!email) {
        throw error.emailErr
      }
      throw error.passworErr
    }
    const data = await Request.post(`${BASE_URL}/auth/signin`, {
      email,
      password
    })

    dispatch({
      type: SIGN_IN,
      payload: data
    })

    if (data.data) {
      const { token } = data.data

      AuthToken.setToken(token)
      history.push("/")
    }
  } catch (error) {
    dispatch({
      type: SIGN_IN,
      payload: error
    })
  }
}

export { getInputData, signIn }
