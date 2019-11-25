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
  const token = decode(getToken())
  return token
}

const isAdmin = () => {
  if (loggedIn()) {
    const { rolenumber } = getConfirm()
    if (rolenumber === 1919) {
      return true
    }
  }

  return false
}

export {
  loggedIn,
  isTokenExpired,
  setToken,
  getToken,
  logout,
  getConfirm,
  isAdmin
}
