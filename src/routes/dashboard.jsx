import PostAdd from "@material-ui/icons/PostAdd"
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate"
import PostGifPage from "../Pages/GifPage/PostGifPage"
import PostArticlePage from "../Pages/ArticlePage/PostArticlePage"

const dashRoutes = [
  {
    path: "/home/pages/post-gif",
    name: "Post Gif",
    icon: AddPhotoAlternate,
    component: PostGifPage
  },
  {
    path: "/home/pages/post-artcle",
    name: "Post Article",
    icon: PostAdd,
    component: PostArticlePage
  },
  { redirect: true, path: "/", pathTo: "/", name: "Dashboard" }
]
export default dashRoutes
