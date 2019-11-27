/* eslint-disable import/prefer-default-export */
import { SIGN_IN, SIGN_UP } from "./types"
import { BASE_URL } from "../constants"
import { Request, AuthToken, history } from "../../Utils"

const signIn = () => async (dispatch, store) => {
  try {
    const { email, password } = await store().general.inputData

    if (!email || !password) {
      const error = {
        emailErr: { status: "error", message: "Input Your Email" },
        passworErr: { status: "error", message: "Input Your Password" }
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
      jobRole,
      department,
      address,
      checked
    } = await store().general.inputData

    let admin = false

    if (checked !== undefined) {
      admin = checked[0] === 1
    }

    if (!email || !password || !rePassword) {
      const error = {
        emailErr: { status: "error", message: "Input Your Email" },
        passworErr: { status: "error", message: "Input Your Password" },
        rePassworErr: { status: "error", message: "Input Your Password" },
        notMatch: { status: "error", message: "Input Your Password" }
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
      firstname: firstName,
      lastname: lastName,
      gender,
      jobrole: jobRole,
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

export { signIn, createUser }
