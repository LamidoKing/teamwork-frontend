import Fingerprint from "@material-ui/icons/Fingerprint"
import { SignIn } from "../Pages/AuthPage"

const pagesRoutes = [
  {
    path: "/pages/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: SignIn
  }
]

export default pagesRoutes
