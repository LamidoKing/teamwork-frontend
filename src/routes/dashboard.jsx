import PostAdd from "@material-ui/icons/PostAdd"
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate"
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed"

import PostGifPage from "../Pages/GifPage/PostGifPage"
import PostArticlePage from "../Pages/ArticlePage/PostArticlePage"
import FeedPage from "../Pages/FeedPage/FeedPage"

const dashRoutes = [
  {
    path: "/home/pages/feed",
    name: "Home",
    icon: DynamicFeedIcon,
    component: FeedPage
  },
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
  { redirect: true, path: "/", pathTo: "/home/pages/feed", name: "Home" }
]
export default dashRoutes
