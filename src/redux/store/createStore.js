import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { createLogger } from "redux-logger"
import reducer from "../reducers"

const log = []

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    diff: true,
    collapsed: true
  })

  log.push(logger)
}

const composeEnhancers = composeWithDevTools({})

const state = {}

export default (initialState = state) => {
  const store = createStore(
    reducer(),
    initialState,
    composeEnhancers(applyMiddleware(thunk, ...log))
  )
  return store
}
