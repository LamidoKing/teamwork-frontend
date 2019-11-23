import Pages from "../Layouts/Pages"
import Dashboard from "../Layouts/Dashboard"

const indexRoutes = [
  { path: "/pages", component: Pages },
  { path: "/", type: "private", component: Dashboard }
]

export default indexRoutes
