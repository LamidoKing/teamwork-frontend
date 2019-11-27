/* eslint-disable import/prefer-default-export */
import * as AuthToken from "./token"

const postoptions = type => {
  let headers = {
    Accept: "application/json"
  }

  if (type === "data") {
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }

  if (AuthToken.loggedIn()) {
    headers.Authorization = `Bearer ${AuthToken.getToken()}`
  }

  const options = {
    mode: "cors",
    cache: "default",
    credentials: "same-origin",
    headers,
    redirect: "follow",
    referrer: "client"
  }

  return options
}

const post = async (url = "", data) => {
  const options = postoptions("data")

  const response = await fetch(url, {
    method: "POST",
    ...options,
    body: JSON.stringify(data)
  })

  return response.json()
}

const postFile = async (url = "", data) => {
  const options = postoptions("file")

  const response = await fetch(url, {
    method: "POST",
    ...options,
    body: data
  })

  return response.json()
}

export { post, postFile }
