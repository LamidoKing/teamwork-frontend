/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { AuthToken } from "../Utils"

const propTypes = {
  component: PropTypes.oneOfType([PropTypes.object]).isRequired
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthToken.loggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/pages/login-page" />
      )
    }
  />
)

PrivateRoute.propTypes = propTypes

export default PrivateRoute
