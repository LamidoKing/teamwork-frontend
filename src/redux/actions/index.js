/* eslint-disable import/prefer-default-export */
import { GET_INPUT, SIGN_IN, SIGN_UP } from "./types"
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

const createUser = () => async (dispatch, store) => {
  try {
    const {
      email,
      password,
      rePassword,
      firstName,
      lastName,
      gender,
      department,
      address,
      checked
    } = await store().user.inputData

    let admin = false

    if (checked !== undefined) {
      admin = checked[0] === 1
    }

    if (!email || !password || !rePassword) {
      const error = {
        emailErr: { status: "error", error: "Input Your Email" },
        passworErr: { status: "error", error: "Input Your Password" },
        rePassworErr: { status: "error", error: "Input Your Password" },
        notMatch: { status: "error", error: "Input Your Password" }
      }

      if (!email) {
        throw error.emailErr
      }

      if (!password) {
        throw error.passworErr
      }

      throw error.rePassworErr
    }

    if (password !== rePassword) {
      const error = { status: "error", error: "password not match" }
      throw error
    }

    const data = await Request.post(`${BASE_URL}/auth/create-user`, {
      email,
      password,
      firstName,
      lastName,
      gender,
      department,
      address,
      admin
    })

    dispatch({
      type: SIGN_UP,
      payload: data
    })

    if (data.data) {
      history.push("/")
    }
  } catch (error) {
    dispatch({
      type: SIGN_UP,
      payload: error
    })
  }
}

export { getInputData, signIn, createUser }
