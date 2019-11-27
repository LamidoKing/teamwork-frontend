import { combineReducers } from "redux"
import user from "./user"
import general from "./general"
import gif from "./gif"
import article from "./article"

const reducers = () => {
  return combineReducers({
    general,
    user,
    gif,
    article
  })
}
export default reducers
