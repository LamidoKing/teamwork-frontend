/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from "react"
import PropTypes from "prop-types"
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar"
import { NavLink } from "react-router-dom"
import cx from "classnames"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Hidden from "@material-ui/core/Hidden"
import Collapse from "@material-ui/core/Collapse"
import Icon from "@material-ui/core/Icon"
import Person from "@material-ui/icons/Person"
import HeaderLinks from "../Header/HeaderLinks"
import { AuthToken } from "../../Utils"
import sidebarStyle from "../../Style/Components/sidebarStyle"

let ps

class SidebarWrapper extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const component = this.sidebarWrapper
      ps = new PerfectScrollbar(component, {
        suppressScrollX: true,
        suppressScrollY: false
      })
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy()
    }
  }

  render() {
    const { className, user, headerLinks, links } = this.props
    return (
      <div
        className={className}
        ref={c => {
          this.sidebarWrapper = c
        }}
      >
        {user}
        {headerLinks}
        {links}
      </div>
    )
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openAvatar: false,
      openComponents: this.activeRoute("/components"),
      openForms: this.activeRoute("/forms"),
      openTables: this.activeRoute("/tables"),
      openMaps: this.activeRoute("/maps"),
      openPages: this.activeRoute("-page"),
      miniActive: true
    }
    this.activeRoute.bind(this)
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
  }

  openCollapse(collapse) {
    const st = {}
    st[collapse] = !this.state[collapse]
    this.setState(st)
  }

  render() {
    const {
      classes,
      color,
      logo,
      image,
      logoText,
      routes,
      bgColor,
      rtlActive
    } = this.props
    const itemText = `${classes.itemText} ${cx({
      [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
      [classes.itemTextMiniRTL]:
        rtlActive && this.props.miniActive && this.state.miniActive,
      [classes.itemTextRTL]: rtlActive
    })}`
    const collapseItemText = `${classes.collapseItemText} ${cx({
      [classes.collapseItemTextMini]:
        this.props.miniActive && this.state.miniActive,
      [classes.collapseItemTextMiniRTL]:
        rtlActive && this.props.miniActive && this.state.miniActive,
      [classes.collapseItemTextRTL]: rtlActive
    })}`
    const userWrapperClass = `${classes.user} ${cx({
      [classes.whiteAfter]: bgColor === "white"
    })}`
    const caret = `${classes.caret} ${cx({
      [classes.caretRTL]: rtlActive
    })}`
    const collapseItemMini = `${classes.collapseItemMini} ${cx({
      [classes.collapseItemMiniRTL]: rtlActive
    })}`
    const user = (
      <div className={userWrapperClass}>
        <div className={classes.photo}>
          <Icon>
            <Person />
          </Icon>
        </div>
        <List className={classes.list}>
          <ListItem className={`${classes.item} ${classes.userItem}`}>
            <NavLink
              to="#"
              className={`${classes.itemLink} ${classes.userCollapseButton}`}
              onClick={() => this.openCollapse("openAvatar")}
            >
              <ListItemText
                primary="Admin Section"
                secondary={
                  <b
                    className={`${caret} ${classes.userCaret} ${
                      this.state.openAvatar ? classes.caretActive : ""
                    }`}
                  />
                }
                disableTypography
                className={`${itemText} ${classes.userItemText}`}
              />
            </NavLink>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={`${classes.list} ${classes.collapseList}`}>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="/pages/create-user"
                    className={`${classes.itemLink} ${classes.userCollapseLinks}`}
                  >
                    <span className={collapseItemMini}>
                      {rtlActive ? "و" : "CU"}
                    </span>
                    <ListItemText
                      primary={rtlActive ? "إعدادات" : "Create user"}
                      disableTypography
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    )
    const links = (
      <List className={classes.list}>
        {routes.map(prop => {
          if (prop.redirect) {
            return null
          }
          if (prop.sidebar === false) {
            return null
          }
          if (prop.collapse) {
            const navLinkClasses = `${classes.itemLink} ${cx({
              [` ${classes.collapseActive}`]: this.activeRoute(prop.path)
            })}`
            const itemText = `${classes.itemText} ${cx({
              [classes.itemTextMini]:
                this.props.miniActive && this.state.miniActive,
              [classes.itemTextMiniRTL]:
                rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.itemTextRTL]: rtlActive
            })}`
            const collapseItemText = `${classes.collapseItemText} ${cx({
              [classes.collapseItemTextMini]:
                this.props.miniActive && this.state.miniActive,
              [classes.collapseItemTextMiniRTL]:
                rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.collapseItemTextRTL]: rtlActive
            })}`
            const itemIcon = `${classes.itemIcon} ${cx({
              [classes.itemIconRTL]: rtlActive
            })}`
            const caret = `${classes.caret} ${cx({
              [classes.caretRTL]: rtlActive
            })}`
            return (
              <ListItem key={prop} className={classes.item}>
                <NavLink
                  to="#"
                  className={navLinkClasses}
                  onClick={() => this.openCollapse(prop.state)}
                >
                  <ListItemIcon className={itemIcon}>
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <prop.icon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={prop.name}
                    secondary={
                      <b
                        className={`${caret} ${
                          this.state[prop.state] ? classes.caretActive : ""
                        }`}
                      />
                    }
                    disableTypography
                    className={itemText}
                  />
                </NavLink>
                <Collapse in={this.state[prop.state]} unmountOnExit>
                  <List className={`${classes.list} ${classes.collapseList}`}>
                    {prop.views.map(prop => {
                      if (prop.redirect) {
                        return null
                      }
                      const navLinkClasses = `${classes.collapseItemLink} ${cx({
                        [` ${classes[color]}`]: this.activeRoute(prop.path)
                      })}`
                      const collapseItemMini = `${
                        classes.collapseItemMini
                      } ${cx({
                        [classes.collapseItemMiniRTL]: rtlActive
                      })}`
                      return (
                        <ListItem
                          key={prop.path}
                          className={classes.collapseItem}
                        >
                          <NavLink to={prop.path} className={navLinkClasses}>
                            <span className={collapseItemMini}>
                              {prop.mini}
                            </span>
                            <ListItemText
                              primary={prop.name}
                              disableTypography
                              className={collapseItemText}
                            />
                          </NavLink>
                        </ListItem>
                      )
                    })}
                  </List>
                </Collapse>
              </ListItem>
            )
          }
          const navLinkClasses = `${classes.itemLink} ${cx({
            [` ${classes[color]}`]: this.activeRoute(prop.path)
          })}`
          const itemText = `${classes.itemText} ${cx({
            [classes.itemTextMini]:
              this.props.miniActive && this.state.miniActive,
            [classes.itemTextMiniRTL]:
              rtlActive && this.props.miniActive && this.state.miniActive,
            [classes.itemTextRTL]: rtlActive
          })}`
          const itemIcon = `${classes.itemIcon} ${cx({
            [classes.itemIconRTL]: rtlActive
          })}`
          return (
            <ListItem key={prop.path} className={classes.item}>
              <NavLink to={prop.path} className={navLinkClasses}>
                <ListItemIcon className={itemIcon}>
                  {typeof prop.icon === "string" ? (
                    <Icon>{prop.icon}</Icon>
                  ) : (
                    <prop.icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={prop.name}
                  disableTypography
                  className={itemText}
                />
              </NavLink>
            </ListItem>
          )
        })}
      </List>
    )

    const logoNormal = `${classes.logoNormal} ${cx({
      [classes.logoNormalSidebarMini]:
        this.props.miniActive && this.state.miniActive,
      [classes.logoNormalSidebarMiniRTL]:
        rtlActive && this.props.miniActive && this.state.miniActive,
      [classes.logoNormalRTL]: rtlActive
    })}`
    const logoMini = `${classes.logoMini} ${cx({
      [classes.logoMiniRTL]: rtlActive
    })}`
    const logoClasses = `${classes.logo} ${cx({
      [classes.whiteAfter]: bgColor === "white"
    })}`
    const brand = (
      <div className={logoClasses}>
        <a href="https://lamido.cf" className={logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </a>
        <a href="https://lamido.cf" className={logoNormal}>
          {logoText}
        </a>
      </div>
    )
    const drawerPaper = `${classes.drawerPaper} ${cx({
      [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      [classes.drawerPaperRTL]: rtlActive
    })}`
    const sidebarWrapper = `${classes.sidebarWrapper} ${cx({
      [classes.drawerPaperMini]: this.props.miniActive && this.state.miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    })}`
    return (
      <div
        ref={c => {
          this.sidebarWrmainPanelapper = c
        }}
      >
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={rtlActive ? "left" : "right"}
            open={this.props.open}
            classes={{
              paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={AuthToken.isAdmin() && user}
              headerLinks={<HeaderLinks rtlActive={rtlActive} />}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: `url(${image})` }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={rtlActive ? "right" : "left"}
            variant="permanent"
            open
            classes={{
              paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={AuthToken.isAdmin() && user}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: `url(${image})` }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    )
  }
}

Sidebar.defaultProps = {
  bgColor: "blue"
}

Sidebar.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object)
}

export default withStyles(sidebarStyle)(Sidebar)
