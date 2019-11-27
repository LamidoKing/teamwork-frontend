import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import withStyles from "@material-ui/core/styles/withStyles"
import InputAdornment from "@material-ui/core/InputAdornment"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import PermIdentity from "@material-ui/icons/PermIdentity"
import Check from "@material-ui/icons/Check"
import IconButton from "@material-ui/core/IconButton"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Email from "@material-ui/icons/Email"
import GridContainer from "../../Components/Grid/GridContainer"
import GridItem from "../../Components/Grid/GridItem"
import Button from "../../Components/CustomButtons/Button"
import CustomInput from "../../Components/CustomInput/CustomInput"
import Clearfix from "../../Components/Clearfix/Clearfix"
import Card from "../../Components/Card/Card"
import CardBody from "../../Components/Card/CardBody"
import CardHeader from "../../Components/Card/CardHeader"
import CardIcon from "../../Components/Card/CardIcon"
import Notification from "../../Components/Notification/Notification"
import { UserAction, GeneralAction } from "../../redux/actions"
import createUserStyle from "../../Style/Pages/createUser"

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getInputData: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.object])
}

const defaultProps = {
  error: {}
}

const mapStateToProps = state => ({
  inputDataSignUp: state.general.inputDataSignUp || {},
  error: state.user.error || {}
})

const mapActionCreators = {
  getInputData: GeneralAction.getInputData,
  createUser: UserAction.createUser
}

class CreateUserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: [],
      cardAnimaton: "cardHidden",
      showPassword: false,
      tr: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.cardAmination = this.cardAmination.bind(this)
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

  handleSignUp = () => {
    const { createUser } = this.props
    createUser()
  }

  handleToggle(value) {
    const { getInputData } = this.props
    const { checked } = this.state
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    getInputData({
      key: "checked",
      value: newChecked
    })

    this.setState({
      checked: newChecked
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
    const { cardAnimaton, showPassword, tr } = this.state
    return (
      <div className={classes.container}>
        <Notification tr={tr} message={error.message || error.error} />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Create User Account</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5} />
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
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
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Re-type Password"
                      id="rePassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: showPassword ? "text" : "password",
                        name: "rePassword",
                        onChange: this.handleInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="firstName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "firstName",
                        onChange: this.handleInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <PermIdentity
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="lastName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "lastName",
                        onChange: this.handleInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <PermIdentity
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5} />
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Gender"
                      id="gender"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "gender",
                        onChange: this.handleInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <PermIdentity
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Job Role"
                      id="jobRole"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "jobRole",
                        onChange: this.handleInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <PermIdentity
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Department"
                      id="department"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "department",
                        onChange: this.handleInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <PermIdentity
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "address",
                        onChange: this.handleInput,
                        endAdornment: (
                          <InputAdornment position="end">
                            <PermIdentity
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer />
                <FormControlLabel
                  classes={{
                    root: classes.checkboxLabelControl,
                    label: classes.checkboxLabel
                  }}
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => this.handleToggle(1)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  label={<span>Create User with Admin Access</span>}
                />
                <br />
                <div className={classes.center}>
                  <Button
                    color="rose"
                    className={classes.updateProfileButton}
                    onClick={this.handleSignUp}
                  >
                    Create User
                  </Button>
                  <br />
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

CreateUserPage.propTypes = propTypes

CreateUserPage.defaultProps = defaultProps

export default connect(
  mapStateToProps,
  mapActionCreators
)(withStyles(createUserStyle)(CreateUserPage))
