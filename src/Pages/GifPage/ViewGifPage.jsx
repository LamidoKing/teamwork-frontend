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
import FlagIcon from "@material-ui/icons/Flag"
import Skeleton from "@material-ui/lab/Skeleton"
import CustomInput from "../../Components/CustomInput/CustomInput"
import GridContainer from "../../Components/Grid/GridContainer"
import GridItem from "../../Components/Grid/GridItem"
import Button from "../../Components/CustomButtons/Button"
import Card from "../../Components/Card/Card"
import CardHeader from "../../Components/Card/CardHeader"
import CardBody from "../../Components/Card/CardBody"
import CardFooter from "../../Components/Card/CardFooter"
import Comment from "../../Components/Comment/Comment"
import Notification from "../../Components/Notification/Notification"
import feedStyle from "../../Style/Pages/feedStyle"
import { GifAction, GeneralAction } from "../../redux/actions"
import { AuthToken } from "../../Utils"

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getGif: PropTypes.func.isRequired,
  getInputData: PropTypes.func.isRequired,
  deleteGif: PropTypes.func.isRequired,
  commentGif: PropTypes.func.isRequired,
  flagGif: PropTypes.func.isRequired,
  flagGifComment: PropTypes.func.isRequired,
  gifData: PropTypes.oneOfType([PropTypes.object]),
  commentData: PropTypes.oneOfType([PropTypes.object]),
  flagGifData: PropTypes.oneOfType([PropTypes.object]),
  flagGifCommentData: PropTypes.oneOfType([PropTypes.object]),
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
  error: PropTypes.oneOfType([PropTypes.object]).isRequired
}

const defaultProps = {
  gifData: {},
  flagGifData: {},
  flagGifCommentData: {},
  commentData: {}
}

const mapStateToProps = state => ({
  gifData: state.gif.specificGifData.data || {},
  commentData: state.gif.commentData || {},
  flagGifData: state.gif.flagGifData || {},
  flagGifCommentData: state.gif.flagGifCommentData || {},
  error: state.gif.error || {}
})

const mapActionCreators = {
  getGif: GifAction.getGif,
  getInputData: GeneralAction.getInputData,
  deleteGif: GifAction.deleteGif,
  commentGif: GifAction.commentGifs,
  flagGif: GifAction.flagGif,
  flagGifComment: GifAction.flagGifComment
}

class ViewGifPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      openCommentDl: false,
      openFlagDl: false,
      flag: true,
      tr: false
    }
  }

  componentDidMount() {
    const { getGif, match } = this.props
    const { id } = match.params
    getGif(id)
  }

  componentDidUpdate(prevProps) {
    const {
      getGif,
      commentData,
      error,
      flagGifData,
      flagGifCommentData,
      match
    } = this.props
    const { id } = match.params

    if (prevProps.commentData !== commentData) {
      getGif(id)
      this.handleClose()
    }
    if (prevProps.error.message !== error.message) {
      this.showNotification("tr")
    }
    if (prevProps.flagGifData.status !== flagGifData.status) {
      this.showNotification("tr")
    }
    if (prevProps.flagGifCommentData.status !== flagGifCommentData.status) {
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

  handleInput = name => ({ target: { value } }) => {
    const { getInputData } = this.props

    getInputData({
      key: name,
      value
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      openCommentDl: false,
      openFlagDl: false
    })
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
      openCommentDl: false
    })
  }

  handleDelete = () => {
    const { deleteGif, match } = this.props
    const { id } = match.params
    deleteGif(id)
  }

  handleCommentButton = () => {
    this.setState({
      openCommentDl: true,
      open: false
    })
  }

  handleFlagButton = () => {
    this.setState({
      openFlagDl: true,
      openCommentDl: false,
      open: false,
      category: "gif"
    })
  }

  handleFlagCommentButton = (authorIdForComment, commentFlag, commentId) => {
    this.setState({
      openFlagDl: true,
      openCommentDl: false,
      open: false,
      authorIdForComment,
      commentFlag,
      commentId,
      category: "comment"
    })
  }

  handleFlagAction = () => {
    const { gifData } = this.props
    const { authorId, id } = gifData
    const {
      flag,
      authorIdForComment,
      commentFlag,
      commentId,
      category
    } = this.state

    if (category === "gif") {
      this.handleFlag(authorId, flag, id, "")
    }
    if (category === "comment") {
      this.handleFlag(authorIdForComment, commentFlag, "", commentId)
    }
  }

  handleComment = () => {
    const { commentGif, match } = this.props
    const { id } = match.params
    commentGif(id)
  }

  handleFlag = (userId, flag, gifId, commentId) => {
    const { flagGif, flagGifComment, match } = this.props
    const { id } = match.params

    if (gifId !== "") {
      flagGif(id, userId, flag, gifId)
    }

    if (commentId !== "") {
      flagGifComment(id, userId, flag, commentId)
    }
    this.handleClose()
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
      gifData,
      flagGifData,
      flagGifCommentData,
      error
    } = this.props
    const { open, openCommentDl, openFlagDl, category, tr } = this.state
    const { imageUrl, title, authorId, createdOn } = gifData
    const author = AuthToken.getConfirm().userId === authorId

    return (
      <div>
        <Notification
          tr={tr}
          message={
            error.message ||
            error.error ||
            flagGifData.status ||
            flagGifCommentData.status
          }
        />
        <div>
          <Dialog
            fullWidth
            maxWidth="xl"
            open={open || openCommentDl || openFlagDl}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Gif</DialogTitle>
            {open && (
              <>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are You Sure You Want Delete This Gif This cannot be Undone
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
            {openCommentDl && open === false && (
              <>
                <DialogContent>
                  <DialogContentText>
                    You Can comment this Gif
                  </DialogContentText>
                  <CustomInput
                    labelText="Comment"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      name: "commentGif",
                      onChange: this.handleInput("commentGif"),
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
            {openFlagDl && openCommentDl === false && open === false && (
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
        <br />
        <GridContainer justify="center">
          {imageUrl ? (
            <GridItem xs={12} sm={12} md={12}>
              <Card product className={classes.cardHover}>
                <CardHeader image className={classes.cardHeaderHover}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={imageUrl} alt="..." />
                  </a>
                </CardHeader>
                <CardBody>
                  <div className={classes.cardHoverUnder}>
                    {author && (
                      <Button
                        simple
                        color="info"
                        onClick={this.handleClickOpen}
                      >
                        <Delete className={classes.underChartIcons} />
                        Delete
                      </Button>
                    )}
                  </div>
                  <h4 className={classes.cardProductTitle}>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      {title}
                    </a>
                  </h4>
                </CardBody>
                <CardFooter product>
                  <div className={classes.price}>
                    <Moment fromNow>{createdOn}</Moment>
                  </div>
                  <div>
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
              {gifData.comments && (
                <Comment
                  comments={gifData.comments}
                  handleFlagCommentButton={this.handleFlagCommentButton}
                  isArticleFlag={false}
                />
              )}
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={12}>
              <Skeleton variant="rect" height={300}>
                <Skeleton
                  variant="rect"
                  height={200}
                  style={{ marginLeft: 10, marginRight: 10 }}
                />
                <Skeleton
                  height={18}
                  style={{ marginLeft: 10, marginRight: 10, marginBottom: 8 }}
                />
                <Skeleton
                  height={18}
                  style={{ marginLeft: 10, marginRight: 10, marginBottom: 8 }}
                />
                <Skeleton
                  height={18}
                  style={{ marginLeft: 10, marginRight: 10, marginBottom: 8 }}
                />
                <Skeleton height={18} width="80%" />
              </Skeleton>
            </GridItem>
          )}
        </GridContainer>
      </div>
    )
  }
}

ViewGifPage.propTypes = propTypes
ViewGifPage.defaultProps = defaultProps

export default connect(
  mapStateToProps,
  mapActionCreators
)(withStyles(feedStyle)(ViewGifPage))
