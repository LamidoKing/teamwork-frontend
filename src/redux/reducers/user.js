import update from "react-addons-update"

const handleGetinputData = (state, action) => {
  const { key, value } = action.payload
  return update(state, {
    inputData: {
      [key]: {
        $set: value
      }
    }
  })
}

const handleSignIn = (state, action) => {
  if (action.payload.status === "success") {
    return update(state, {
      userData: {
        $set: action.payload
      },
      signInError: {
        $set: {}
      }
    })
  }
  return update(state, {
    signInError: {
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
      signInError: {
        $set: {}
      }
    })
  }
  return update(state, {
    signInError: {
      $set: action.payload
    },
    CreatedUserData: {
      $set: {}
    }
  })
}

const ACTION_HANDLERS = {
  GET_INPUT: handleGetinputData,
  SIGN_IN: handleSignIn,
  SIGN_UP: handleCreateUser
}

const initialState = {
  inputData: {},
  userData: {},
  CreatedUserData: {},
  signInError: {}
}

const userReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default userReducer
