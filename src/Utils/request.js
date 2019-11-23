/* eslint-disable import/prefer-default-export */
import * as AuthToken from "./token"

const post = async (url = "", data) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  }

  if (AuthToken.loggedIn()) {
    headers.Authorization = `Bearer ${AuthToken.getToken()}`
  }

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "default",
    credentials: "same-origin",
    headers,
    redirect: "follow",
    referrer: "client",
    body: JSON.stringify(data)
  })

  return response.json()
}

export { post }
