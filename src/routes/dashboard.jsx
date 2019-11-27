import Fingerprint from "@material-ui/icons/Fingerprint"
import PostGifPage from "../Pages/GifPage/PostGifPage"

const dashRoutes = [
  {
    path: "/home/pages/post-gif",
    name: "Post Gif",
    icon: Fingerprint,
    component: PostGifPage
  },
  { redirect: true, path: "/", pathTo: "/", name: "Dashboard" }
]
export default dashRoutes
