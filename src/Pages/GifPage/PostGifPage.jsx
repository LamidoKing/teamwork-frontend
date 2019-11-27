import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import withStyles from "@material-ui/core/styles/withStyles"
import GridContainer from "../../Components/Grid/GridContainer"
import GridItem from "../../Components/Grid/GridItem"
import ImageUpload from "../../Components/CustomUpload/ImageUpload"
import Card from "../../Components/Card/Card"
import CardBody from "../../Components/Card/CardBody"
import CardFooter from "../../Components/Card/CardFooter"
import CustomInput from "../../Components/CustomInput/CustomInput"
import Button from "../../Components/CustomButtons/Button"
import postGifStyles from "../../Style/Pages/postGifStyles"
import Notification from "../../Components/Notification/Notification"
import { GifAction, GeneralAction } from "../../redux/actions"

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getInputData: PropTypes.func.isRequired,
  postGif: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.object])
}

const defaultProps = {
  error: {}
}

const mapStateToProps = state => ({
  inputData: state.general.inputData || {},
  error: state.gif.error || {}
})

const mapActionCreators = {
  getInputData: GeneralAction.getInputData,
  postGif: GifAction.postGif
}

class PostGifPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tr: false
    }

    this.handleGifInput = this.handleGifInput.bind(this)
    this.handlePlace = this.handlePlace.bind(this)
    this.handleClearGif = this.handleClearGif.bind(this)
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
    clearTimeout(this.timeOutFunction)
    this.timeOutFunction = null
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

  handleGifInput = event => {
    const { getInputData } = this.props
    const { files } = event.target
    const name = "file"
    const gif = files[0]
    getInputData({
      key: name,
      value: gif
    })
  }

  handlePostGif = () => {
    const { postGif, getInputData } = this.props
    postGif()
    const gifInput = ["file", "title"]
    gifInput.forEach(value => {
      getInputData({
        key: value,
        value: null
      })
    })
  }

  handleClearGif = () => {
    const { getInputData } = this.props
    getInputData({
      key: "file",
      value: null
    })
  }

  handlePlace = () => {
    this.setState({ tr: false })
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
    const { tr } = this.state
    const { classes, error } = this.props
    return (
      <div className={classes.container}>
        <Notification tr={tr} message={error.message || error.error} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem>
                    <CustomInput
                      labelText="Gif Title"
                      id="title"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "title",
                        onChange: this.handleInput
                      }}
                    />
                    <br />
                    <br />
                    <ImageUpload
                      handleGifInput={this.handleGifInput}
                      handleClearGif={this.handleClearGif}
                      addButtonProps={{
                        color: "rose",
                        round: true
                      }}
                      changeButtonProps={{
                        color: "rose",
                        round: true
                      }}
                      removeButtonProps={{
                        color: "danger",
                        round: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridItem xs={12} sm={12} md={12}>
                  <div className={classes.center}>
                    <Button color="rose" size="lg" onClick={this.handlePostGif}>
                      Post Gif
                    </Button>
                  </div>
                </GridItem>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

PostGifPage.propTypes = propTypes

PostGifPage.defaultProps = defaultProps

export default connect(
  mapStateToProps,
  mapActionCreators
)(withStyles(postGifStyles)(PostGifPage))
