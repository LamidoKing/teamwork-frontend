import React from "react"
import cx from "classnames"
import PropTypes from "prop-types"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

import headingStyle from "../../Style/Components/headingStyle"

function Heading({ ...props }) {
  const { textAlign, category, title, classes } = props
  const heading = `${classes.heading} ${cx({
    [classes[`${textAlign}TextAlign`]]: textAlign !== undefined
  })}`
  if (title !== undefined || category !== undefined) {
    return (
      <div className={heading}>
        {title !== undefined ? (
          <h3 className={classes.title}>{title}</h3>
        ) : null}
        {category !== undefined ? (
          <p className={classes.category}>{category}</p>
        ) : null}
      </div>
    )
  }
  return null
}

Heading.defaultProps = {
  title: "",
  category: ""
}
Heading.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  title: PropTypes.node,
  category: PropTypes.node,
  textAlign: PropTypes.oneOf(["right", "left", "center"]).isRequired
}

export default withStyles(headingStyle)(Heading)
