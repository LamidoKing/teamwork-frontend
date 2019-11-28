import { combineReducers } from "redux"
import user from "./user"
import general from "./general"
import gif from "./gif"
import article from "./article"
import feed from "./feed"

const reducers = () => {
  return combineReducers({
    general,
    user,
    gif,
    article,
    feed
  })
}
export default reducers
