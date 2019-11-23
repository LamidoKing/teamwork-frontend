/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from "react"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import Grid from "@material-ui/core/Grid"

const style = {
  grid: {
    padding: "0 15px !important"
  }
}

function GridItem({ ...props }) {
  const { classes, children, className, ...rest } = props
  return (
    <Grid item {...rest} className={`${classes.grid} ${className}`}>
      {children}
    </Grid>
  )
}

export default withStyles(style)(GridItem)
