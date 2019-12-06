import React from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"

import badgeStyle from "../../Style/Components/badgeStyle"

function Badge({ ...props }) {
  const { classes, color, children } = props
  return (
    <span className={`${classes.badge} ${classes[color]}`}>{children}</span>
  )
}

Badge.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]).isRequired,
  children: PropTypes.node.isRequired
}

export default withStyles(badgeStyle)(Badge)
