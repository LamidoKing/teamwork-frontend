import Fingerprint from "@material-ui/icons/Fingerprint"

const dashRoutes = [
  {
    path: "/",
    name: "Page",
    short: "Pages",
    mini: "LP",
    icon: Fingerprint,
    component: ""
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
]
export default dashRoutes
