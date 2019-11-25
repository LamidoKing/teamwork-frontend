import Fingerprint from "@material-ui/icons/Fingerprint"
import PersonAdd from "@material-ui/icons/PersonAdd"
import { SignIn, CreateUser } from "../Pages/AuthPage"

const pagesRoutes = [
  {
    path: "/pages/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: SignIn
  },
  {
    path: "/pages/create-user",
    name: "Create User",
    auth: "admin",
    short: "SignUp",
    mini: "CU",
    icon: PersonAdd,
    component: CreateUser
  }
]

export default pagesRoutes
