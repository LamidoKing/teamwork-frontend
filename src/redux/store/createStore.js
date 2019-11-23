import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { createLogger } from "redux-logger"
import reducer from "../reducers"

const log = createLogger({
  diff: true,
  collapsed: true
})

const composeEnhancers = composeWithDevTools({})

const state = {}

export default (initialState = state) => {
  const store = createStore(
    reducer(),
    initialState,
    composeEnhancers(applyMiddleware(thunk, log))
  )
  return store
}
