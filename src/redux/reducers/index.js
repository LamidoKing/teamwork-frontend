import { combineReducers } from "redux"
import user from "./user"
import general from "./general"
import gif from "./gif"

const reducers = () => {
  return combineReducers({
    general,
    user,
    gif
  })
}
export default reducers
