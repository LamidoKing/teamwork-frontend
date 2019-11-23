import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import AddAlert from "@material-ui/icons/AddAlert"
import Snackbar from "../Snackbar/Snackbar"

const propTypes = {
  message: PropTypes.string,
  tr: PropTypes.bool.isRequired
}
const defaultProps = {
  message: "error"
}
class Notification extends PureComponent {
  render() {
    const { message, tr } = this.props
    return (
      <div>
        <Snackbar
          place="tc"
          color="info"
          icon={AddAlert}
          message={message || "message"}
          open={tr}
          close
        />
      </div>
    )
  }
}

Notification.propTypes = propTypes
Notification.defaultProps = defaultProps

export default Notification
