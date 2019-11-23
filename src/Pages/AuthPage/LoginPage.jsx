import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Email from "@material-ui/icons/Email"
import GridContainer from "../../Components/Grid/GridContainer"
import GridItem from "../../Components/Grid/GridItem"
import CustomInput from "../../Components/CustomInput/CustomInput"
import Button from "../../Components/CustomButtons/Button"
import Card from "../../Components/Card/Card"
import CardBody from "../../Components/Card/CardBody"
import CardHeader from "../../Components/Card/CardHeader"
import CardFooter from "../../Components/Card/CardFooter"
import Notification from "../../Components/Notification/Notification"
import loginPageStyle from "../../Style/Pages/loginPageStyle"
import * as actions from "../../redux/actions"

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getInputData: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signInError: PropTypes.oneOfType([PropTypes.object])
}

const defaultProps = {
  signInError: {}
}

const mapStateToProps = state => ({
  inputData: state.user.inputData || {},
  signInError: state.user.signInError || {}
})

const mapActionCreators = {
  getInputData: actions.getInputData,
  signIn: actions.signIn
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cardAnimaton: "cardHidden",
      showPassword: false,
      tr: false
    }

    this.cardAmination = this.cardAmination.bind(this)
    this.handlePlace = this.handlePlace.bind(this)
  }

  componentDidMount() {
    this.timeOutFunction = setTimeout(this.cardAmination, 700)
  }

  componentDidUpdate(prevProps) {
    const { signInError } = this.props

    if (prevProps.signInError !== signInError) {
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

  cardAmination = () => {
    this.setState({ cardAnimaton: "" })
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }))
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

  handleSignIn = () => {
    const { signIn } = this.props
    signIn()
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
    const { classes, signInError } = this.props
    const { cardAnimaton, showPassword, tr } = this.state

    return (
      <div className={classes.container}>
        <Notification tr={tr} message={signInError.error} />

        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
                  <div className={classes.socialLine}>
                    {[
                      "fab fa-facebook-square",
                      "fab fa-twitter",
                      "fab fa-google-plus"
                    ].map(prop => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={prop}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      )
                    })}
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      name: "email",
                      onChange: this.handleInput,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: showPassword ? "text" : "password",
                      name: "password",
                      onChange: this.handleInput,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    color="rose"
                    simple
                    size="lg"
                    block
                    onClick={this.handleSignIn}
                  >
                    Sign In
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

LoginPage.propTypes = propTypes

LoginPage.defaultProps = defaultProps

export default connect(
  mapStateToProps,
  mapActionCreators
)(withStyles(loginPageStyle)(LoginPage))
