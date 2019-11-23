import decode from "jwt-decode"

const setToken = idToken => {
  localStorage.setItem("TOKEN", idToken)
}

const getToken = () => {
  return localStorage.getItem("TOKEN")
}

const isTokenExpired = token => {
  try {
    const decoded = decode(token)
    if (decoded.exp < Date.now() / 1000) {
      return true
    }
    return false
  } catch (err) {
    console.log("expired check failed! Line 42: AuthService.js")
    return false
  }
}

const loggedIn = () => {
  const token = getToken()
  return !!token && !isTokenExpired(token)
}

const logout = () => {
  localStorage.removeItem("TOKEN")
}

const getConfirm = () => {
  const token = decode(this.getToken())
  return token
}

export { loggedIn, isTokenExpired, setToken, getToken, logout, getConfirm }
