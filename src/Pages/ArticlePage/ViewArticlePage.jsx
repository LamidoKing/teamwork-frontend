import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Moment from "react-moment"
import withStyles from "@material-ui/core/styles/withStyles"
import CommentIcon from "@material-ui/icons/Comment"
import Delete from "@material-ui/icons/Delete"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Edit from "@material-ui/icons/Edit"
import FlagIcon from "@material-ui/icons/Flag"
import Skeleton from "@material-ui/lab/Skeleton"
import CustomInput from "../../Components/CustomInput/CustomInput"
import GridContainer from "../../Components/Grid/GridContainer"
import GridItem from "../../Components/Grid/GridItem"
import Button from "../../Components/CustomButtons/Button"
import Card from "../../Components/Card/Card"
import CardBody from "../../Components/Card/CardBody"
import CardFooter from "../../Components/Card/CardFooter"
import Comment from "../../Components/Comment/Comment"
import Notification from "../../Components/Notification/Notification"
import feedStyle from "../../Style/Pages/feedStyle"
import { ArticleAction, GeneralAction } from "../../redux/actions"
import { AuthToken } from "../../Utils"

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getArticle: PropTypes.func.isRequired,
  getInputData: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  commentArticle: PropTypes.func.isRequired,
  flagArticle: PropTypes.func.isRequired,
  flagArticleComment: PropTypes.func.isRequired,
  articleData: PropTypes.oneOfType([PropTypes.object]),
  editData: PropTypes.oneOfType([PropTypes.object]),
  commentData: PropTypes.oneOfType([PropTypes.object]),
  flagArticleData: PropTypes.oneOfType([PropTypes.object]),
  flagArticleCommentData: PropTypes.oneOfType([PropTypes.object]),
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  error: PropTypes.oneOfType([PropTypes.object]).isRequired
}

const defaultProps = {
  articleData: {},
  commentData: {},
  editData: {},
  flagArticleData: {},
  flagArticleCommentData: {}
}

const mapStateToProps = state => ({
  articleData: state.article.specificArticleData.data || {},
  editData: state.article.editedArticleData || {},
  commentData: state.article.commentData || {},
  flagArticleData: state.article.flagArticleData || {},
  flagArticleCommentData: state.article.flagArticleCommentData || {},
  error: state.article.error || {}
})

const mapActionCreators = {
  getArticle: ArticleAction.getArticle,
  getInputData: GeneralAction.getInputData,
  editArticle: ArticleAction.editArticle,
  deleteArticle: ArticleAction.deleteArticle,
  commentArticle: ArticleAction.commentArticle,
  flagArticle: ArticleAction.flagArticle,
  flagArticleComment: ArticleAction.flagArticleComment
}

class ViewArticlePage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      openDeleteDl: false,
      openCommentDl: false,
      openFlagDl: false,
      isArticleFlag: false,
      isArticleCommentFlag: false,
      flag: true,
      showPassword: false,
      tr: false
    }
  }

  componentDidMount() {
    const { getArticle, match } = this.props
    const { id } = match.params
    getArticle(id)
  }

  componentDidUpdate(prevProps) {
    const {
      editData,
      getArticle,
      commentData,
      error,
      flagArticleData,
      flagArticleCommentData,
      match
    } = this.props
    const { id } = match.params

    if (prevProps.commentData !== commentData) {
      getArticle(id)
      this.handleClose()
    }
    if (prevProps.editData !== editData) {
      getArticle(id)
    }
    if (prevProps.error.message !== error.message) {
      this.showNotification("tr")
    }
    if (prevProps.flagArticleData.status !== flagArticleData.status) {
      this.showNotification("tr")
    }
    if (
      prevProps.flagArticleCommentData.status !== flagArticleCommentData.status
    ) {
      this.showNotification("tr")
    }
  }

  componentWillUnmount() {
    let id = window.setTimeout(null, 0)
    while (id > 0) {
      window.clearTimeout(id)
      id -= 1
    }
    window.removeEventListener("resize", this.resizeFunction)
    clearTimeout(this.timeOutFunction)
    this.timeOutFunction = null
  }

  handlePlace = () => {
    this.setState({ tr: false })
  }

  handleInput = (name, value) => {
    const { getInputData } = this.props

    getInputData({
      key: name,
      value
    })
  }

  handleClickOpen = () => {
    const { articleData } = this.props
    this.setState({
      open: true,
      openDeleteDl: false,
      CurrentTitle: articleData.title,
      CurrentArticle: articleData.article
    })
  }

  handleClose = () => {
    this.setState({
      openDeleteDl: false,
      openCommentDl: false,
      openFlagDl: false,
      open: false
    })
  }

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      [name]: value
    })

    this.handleInput(name, value)
  }

  handleSubmit = () => {
    const { editArticle, articleData } = this.props
    const { id } = articleData
    editArticle(id)
    this.handleClose()
  }

  handleDeleteButton = () => {
    this.setState({
      openDeleteDl: true,
      openCommentDl: false,
      openFlagDl: false,
      open: false
    })
  }

  handleCommentButton = () => {
    this.setState({
      openCommentDl: true,
      openDeleteDl: false,
      openFlagDl: false,
      open: false
    })
  }

  handleFlagButton = () => {
    this.setState({
      openFlagDl: true,
      openCommentDl: false,
      openDeleteDl: false,
      open: false,
      category: "article"
    })
  }

  handleFlagCommentButton = (authorIdForComment, commentFlag, commentId) => {
    this.setState({
      openFlagDl: true,
      openCommentDl: false,
      openDeleteDl: false,
      open: false,
      authorIdForComment,
      commentFlag,
      commentId,
      category: "comment"
    })
  }

  handleFlagAction = () => {
    const { articleData } = this.props
    const { authorId, id } = articleData
    const {
      flag,
      authorIdForComment,
      commentFlag,
      commentId,
      category
    } = this.state

    if (category === "article") {
      this.handleFlag(authorId, flag, id, "")
    }
    if (category === "comment") {
      this.handleFlag(authorIdForComment, commentFlag, "", commentId)
    }
  }

  handleDelete = () => {
    const { deleteArticle, match } = this.props
    const { id } = match.params
    deleteArticle(id)
  }

  handleComment = () => {
    const { commentArticle, match } = this.props
    const { id } = match.params
    commentArticle(id)
  }

  handleFlag = (userId, flag, articleId, commentId) => {
    const { flagArticle, flagArticleComment, match } = this.props
    const { id } = match.params

    if (articleId !== "") {
      flagArticle(id, userId, flag, articleId)
    }

    if (commentId !== "") {
      flagArticleComment(id, userId, flag, commentId)
    }
    this.handleClose()
  }

  updateFlagButton = name => {
    this.setState({
      [name]: true
    })
  }

  showNotification(place) {
    // eslint-disable-next-line react/destructuring-assignment
    if (!this.state[place]) {
      const x = []
      x[place] = true
      this.setState(x)
      setTimeout(this.handlePlace, 8000)
    }
  }

  render() {
    const {
      classes,
      articleData,
      flagArticleData,
      flagArticleCommentData,
      error
    } = this.props
    const { article, title, createdOn, authorId } = articleData
    const {
      open,
      openDeleteDl,
      openCommentDl,
      openFlagDl,
      CurrentTitle,
      CurrentArticle,
      isArticleCommentFlag,
      isArticleFlag,
      tr,
      category
    } = this.state
    const author = AuthToken.getConfirm().userId === authorId

    return (
      <div>
        <Notification
          tr={tr}
          message={
            error.message ||
            error.error ||
            flagArticleData.status ||
            flagArticleCommentData.status
          }
        />
        <div>
          <Dialog
            fullWidth
            maxWidth="xl"
            open={open || openDeleteDl || openCommentDl || openFlagDl}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Article</DialogTitle>
            {open && (
              <>
                <DialogContent>
                  <DialogContentText>
                    You Can Edit Your Article
                  </DialogContentText>
                  <CustomInput
                    labelText="Article Title"
                    id="articleTitle"
                    name="articleTitle"
                    onChange={this.handleInput}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: CurrentTitle,
                      type: "text",
                      name: "articleTitle",
                      onChange: this.handleChange("CurrentTitle")
                    }}
                  />
                  <CustomInput
                    labelText="Article Title"
                    id="CurrentArticle"
                    name="CurrentArticle"
                    onChange={this.handleInput}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: CurrentArticle,
                      name: "article",
                      onChange: this.handleChange("CurrentArticle"),
                      multiline: true,
                      rows: 8
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSubmit} color="primary">
                    EDIT
                  </Button>
                </DialogActions>
              </>
            )}
            {openDeleteDl && open === false && (
              <>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are You Sure You Want Delete This Article This cannot be
                    Undone
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    NO
                  </Button>
                  <Button onClick={this.handleDelete} color="primary" autoFocus>
                    YES
                  </Button>
                </DialogActions>
              </>
            )}
            {openCommentDl && openDeleteDl === false && open === false && (
              <>
                <DialogContent>
                  <DialogContentText>
                    You Can comment this Article
                  </DialogContentText>
                  <CustomInput
                    labelText="Comment"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      name: "comment",
                      onChange: this.handleChange("comment"),
                      multiline: true,
                      rows: 8
                    }}
                  />

                  {error.status === "error" && (
                    <DialogContentText>{error.message}</DialogContentText>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    CLOSE
                  </Button>
                  <Button
                    onClick={this.handleComment}
                    color="primary"
                    autoFocus
                  >
                    COMMENT
                  </Button>
                </DialogActions>
              </>
            )}
            {openFlagDl &&
              openCommentDl === false &&
              openDeleteDl === false &&
              open === false && (
                <>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are You Sure You Want FLAG This{" "}
                      {category === "article" ? "Article" : "Comment"} as
                      INAPROPRITE This cannot be Undone
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      NO
                    </Button>
                    <Button
                      onClick={this.handleFlagAction}
                      color="primary"
                      autoFocus
                    >
                      YES
                    </Button>
                  </DialogActions>
                </>
              )}
          </Dialog>
        </div>

        <GridContainer justify="center">
          {article ? (
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardBody>
                  <h3 className={classes.center}>{title}</h3>
                  <div>{article}</div>
                </CardBody>
                <CardFooter product>
                  <div className={classes.date}>
                    <Moment fromNow>{createdOn}</Moment>
                  </div>
                  <div>
                    {author && (
                      <>
                        <Button
                          color="primary"
                          round
                          className={classes.marginRight}
                          onClick={this.handleClickOpen}
                        >
                          <Edit className={classes.icons} /> EDIT
                        </Button>
                        <Button
                          color="primary"
                          round
                          className={classes.marginRight}
                          onClick={this.handleDeleteButton}
                        >
                          <Delete className={classes.icons} /> DELETE
                        </Button>
                      </>
                    )}
                    {!author && (
                      <>
                        <Button
                          color="primary"
                          round
                          className={classes.marginRight}
                          onClick={this.handleCommentButton}
                        >
                          <CommentIcon className={classes.icons} /> COMMENT
                        </Button>
                        <Button
                          color="primary"
                          round
                          disabled={isArticleFlag}
                          className={classes.marginRight}
                          onClick={this.handleFlagButton}
                        >
                          <FlagIcon className={classes.icons} /> FLAG
                        </Button>
                      </>
                    )}
                  </div>
                </CardFooter>
              </Card>
              {articleData && (
                <Comment
                  comments={articleData.comments}
                  handleFlagCommentButton={this.handleFlagCommentButton}
                  isArticleFlag={isArticleCommentFlag}
                />
              )}
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={12}>
              <Skeleton variant="rect" height={300}>
                <Skeleton height={18} width="25%" className={classes.center} />
                <Skeleton height={18} style={{ marginBottom: 8 }} />
                <Skeleton height={18} style={{ marginBottom: 8 }} />
                <Skeleton height={18} style={{ marginBottom: 8 }} />
                <Skeleton height={18} style={{ marginBottom: 8 }} />
                <Skeleton height={18} style={{ marginBottom: 8 }} />
                <Skeleton height={18} style={{ marginBottom: 8 }} />
                <Skeleton height={18} width="80%" />
              </Skeleton>
            </GridItem>
          )}
        </GridContainer>
      </div>
    )
  }
}

ViewArticlePage.propTypes = propTypes
ViewArticlePage.defaultProps = defaultProps

export default connect(
  mapStateToProps,
  mapActionCreators
)(withStyles(feedStyle)(ViewArticlePage))
