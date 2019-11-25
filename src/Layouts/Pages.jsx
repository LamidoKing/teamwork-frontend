/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import PropTypes from "prop-types"
import { Switch, Route, Redirect } from "react-router-dom"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// core components
import PagesHeader from "../Components/Header/PagesHeader"
import pagesRoutes from "../routes/pages"
import { AuthToken } from "../Utils"
// import PrivateRoutes from "../routes/PrivateRoutes"
import pagesStyle from "../Style/Layout/pagesStyle"

import bgImage from "../Style/img/register.jpeg"

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired
}

class Pages extends React.Component {
  componentDidMount() {
    document.body.style.overflow = "unset"
  }

  render() {
    const { classes, ...rest } = this.props
    return (
      <div>
        <PagesHeader {...rest} />
        <div
          className={classes.wrapper}
          ref={wrapper => {
            this.wrapper = wrapper
          }}
        >
          <div
            className={classes.fullPage}
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <Switch>
              {pagesRoutes.map(prop => {
                if (prop.auth === "admin" && AuthToken.isAdmin() !== true) {
                  return <Redirect to="/" key={prop.path} />
                }
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={prop.path}
                  />
                )
              })}
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

Pages.propTypes = propTypes

export default withStyles(pagesStyle)(Pages)
