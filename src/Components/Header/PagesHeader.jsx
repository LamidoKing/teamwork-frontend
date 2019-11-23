/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from "react"
import cx from "classnames"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Hidden from "@material-ui/core/Hidden"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
import Menu from "@material-ui/icons/Menu"

// core components
import Button from "../CustomButtons/Button"

// import pagesRoutes from "../../routes/pages";

import pagesHeaderStyle from "../../Style/Components/pagesHeaderStyle"

class PagesHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false })
    }
  }

  render() {
    const { classes, color } = this.props
    const appBarClasses = cx({
      [` ${classes[color]}`]: color
    })
    const list = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to="/dashboard" className={classes.navLink}>
            <ListItemIcon className={classes.listItemIcon}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              disableTypography
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
      </List>
    )
    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} color="transparent">
                TeamWork
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button href="#" className={classes.title} color="transparent">
                TeamWork
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor="right"
                open={this.state.open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    )
  }
}

PagesHeader.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
}

export default withStyles(pagesHeaderStyle)(PagesHeader)
