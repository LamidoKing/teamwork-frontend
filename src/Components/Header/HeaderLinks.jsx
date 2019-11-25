/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Paper from "@material-ui/core/Paper"
import Grow from "@material-ui/core/Grow"
import Hidden from "@material-ui/core/Hidden"
import Popper from "@material-ui/core/Popper"
import Person from "@material-ui/icons/Person"
import Button from "../CustomButtons/Button"
import { AuthToken, history } from "../../Utils"

import headerLinksStyle from "../../Style/Components/headerLinksStyle"

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleLogout = () => {
    AuthToken.logout()
    history.push("/pages/login-page")
    window.location.reload()
  }

  render() {
    const { classes } = this.props
    const { open } = this.state

    const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover)
    const managerClasses = classNames({
      [classes.managerClasses]: true
    })
    return (
      <div>
        <div className={managerClasses}>
          <Button
            color="transparent"
            justIcon
            aria-label="User"
            aria-owns={open ? "menu-list" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={classes.buttonLink}
            buttonRef={node => {
              this.anchorEl = node
            }}
          >
            <Person className={classes.headerLinksSvg + classes.links} />
            <Hidden mdUp implementation="css">
              <span onClick={this.handleClick} className={classes.linkText}>
                User
              </span>
            </Hidden>
          </Button>
          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !open,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleLogout}
                        className={dropdownItem}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    )
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  rtlActive: PropTypes.bool
}

export default withStyles(headerLinksStyle)(HeaderLinks)
