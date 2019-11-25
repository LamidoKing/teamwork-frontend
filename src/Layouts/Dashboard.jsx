/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import cx from "classnames"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar"
import "perfect-scrollbar/css/perfect-scrollbar.css"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// core components
import Header from "../Components/Header/Header"
// import Footer from "../Components/Footer/Footer";
import Sidebar from "../Components/Sidebar/Sidebar"

import dashboardRoutes from "../routes/dashboard"

import appStyle from "../Style/Layout/dashboardStyle"
import andela from "../Style/img/andl.jpeg"

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  userData: PropTypes.oneOfType([PropTypes.object]).isRequired
}

const mapStateToProps = state => ({
  userData: state.user.userData || {}
})

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map(prop => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={prop.path} />

      return (
        <Route path={prop.path} component={prop.component} key={prop.path} />
      )
    })}
  </Switch>
)

let ps

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      miniActive: false,
      color: "blue",
      bgColor: "black"
    }
    this.resizeFunction = this.resizeFunction.bind(this)
    this.sidebarMinimize = this.sidebarMinimize.bind(this)
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      })
      document.body.style.overflow = "hidden"
    }
    window.addEventListener("resize", this.resizeFunction)
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.scrollTop = 0
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy()
    }
    window.removeEventListener("resize", this.resizeFunction)
  }

  handleDrawerToggle = () => {
    const { mobileOpen } = this.state

    this.setState({ mobileOpen: !mobileOpen })
  }

  handleDrawerToggle = () => {
    const { mobileOpen } = this.state
    this.setState({ mobileOpen: !mobileOpen })
  }

  sidebarMinimize() {
    const { miniActive } = this.state
    this.setState({ miniActive: !miniActive })
  }

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false })
    }
  }

  render() {
    const { classes, userData, ...rest } = this.props

    const { mobileOpen, bgColor, color, miniActive } = this.state

    const mainPanel = `${classes.mainPanel} ${cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    })}`

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText="Teamwork"
          logo={andela}
          handleDrawerToggle={this.handleDrawerToggle}
          open={mobileOpen}
          color={color}
          bgColor={bgColor}
          miniActive={miniActive}
          {...rest}
        />
        <div
          className={mainPanel}
          ref={ref => {
            this.mainPanel = ref
          }}
        >
          <Header
            sidebarMinimize={this.sidebarMinimize}
            miniActive={miniActive}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = propTypes

export default connect(mapStateToProps, null)(withStyles(appStyle)(Dashboard))
