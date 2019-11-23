import { combineReducers } from "redux"
import user from "./user"

const reducers = () => {
  return combineReducers({
    user
  })
}
export default reducers
