import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import withStyles from "@material-ui/core/styles/withStyles"
import GridContainer from "../../Components/Grid/GridContainer"
import GridItem from "../../Components/Grid/GridItem"
import Button from "../../Components/CustomButtons/Button"
import CustomInput from "../../Components/CustomInput/CustomInput"
import Clearfix from "../../Components/Clearfix/Clearfix"
import Card from "../../Components/Card/Card"
import CardBody from "../../Components/Card/CardBody"
import Notification from "../../Components/Notification/Notification"
import { ArticleAction, GeneralAction } from "../../redux/actions"
import postArticleStyle from "../../Style/Pages/postArticleStyle"

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getInputData: PropTypes.func.isRequired,
  postArticle: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.object])
}

const defaultProps = {
  error: {}
}

const mapStateToProps = state => ({
  error: state.article.error || {}
})

const mapActionCreators = {
  getInputData: GeneralAction.getInputData,
  postArticle: ArticleAction.postArticle
}

class PostArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tr: false
    }
    this.handlePlace = this.handlePlace.bind(this)
  }

  componentDidMount() {
    this.timeOutFunction = setTimeout(this.cardAmination, 700)
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props

    if (prevProps.error !== error) {
      this.showNotification("tr")
    }
  }

  componentWillUnmount() {
    let id = window.setTimeout(null, 0)
    // eslint-disable-next-line no-plusplus
    while (id--) {
      window.clearTimeout(id)
    }
    window.removeEventListener("resize", this.resizeFunction)
    clearTimeout(this.timeOutFunction)
    this.timeOutFunction = null
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  handlePlace = () => {
    this.setState({ tr: false })
  }

  handleInput = event => {
    const { getInputData } = this.props
    const { target } = event
    const { name } = target
    const input = target.value

    getInputData({
      key: name,
      value: input
    })
  }

  handleArticlePost = () => {
    const { postArticle, getInputData } = this.props
    postArticle()
    const articleInput = ["articleTitle", "article"]
    articleInput.forEach(value => {
      getInputData({
        key: value,
        value: null
      })
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
    const { classes, error } = this.props
    const { tr } = this.state
    return (
      <div>
        <Notification tr={tr} message={error.message || error.error} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Article Title"
                      id="articleTitle"
                      name="articleTitle"
                      onChange={this.handleInput}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "articleTitle",
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Input Article Content"
                      id="article"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "article",
                        onChange: this.handleInput,
                        multiline: true,
                        rows: 8
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <div className={classes.center}>
                  <Button
                    color="rose"
                    className={classes.updateProfileButton}
                    onClick={this.handleArticlePost}
                  >
                    Post Article
                  </Button>
                </div>

                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

PostArticle.propTypes = propTypes

PostArticle.defaultProps = defaultProps

export default connect(
  mapStateToProps,
  mapActionCreators
)(withStyles(postArticleStyle)(PostArticle))
