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

const ACTION_HANDLERS = {
  GET_INPUT: handleGetinputData
}

const initialState = {
  inputData: {}
}

const generalReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default generalReducer
