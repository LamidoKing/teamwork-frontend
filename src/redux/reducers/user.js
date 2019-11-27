import update from "react-addons-update"

const handleSignIn = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      userData: {
        $set: action.payload
      },
      error: {
        $set: {}
      }
    })
  }
  return update(state, {
    error: {
      $set: action.payload
    },
    userData: {
      $set: {}
    }
  })
}

const handleCreateUser = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      CreatedUserData: {
        $set: action.payload
      },
      error: {
        $set: {}
      }
    })
  }
  return update(state, {
    error: {
      $set: action.payload
    },
    CreatedUserData: {
      $set: {}
    }
  })
}

const ACTION_HANDLERS = {
  SIGN_IN: handleSignIn,
  SIGN_UP: handleCreateUser
}

const initialState = {
  userData: {},
  CreatedUserData: {},
  error: {}
}

const userReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default userReducer
