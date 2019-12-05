import { cardTitle } from "../Genaral/GeneralStyle"

import hoverCardStyle from "../Genaral/hoverCardStyle"
import buttonStyle from "../Components/buttonStyle"

const feedStyle = {
  ...hoverCardStyle,
  ...buttonStyle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  cardProductTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px",
    textAlign: "center"
  },
  underChartIcons: {
    width: "17px",
    height: "17px"
  },
  date: {
    color: "inherit",
    "& h4": {
      marginBottom: "0px",
      marginTop: "0px"
    }
  },

  center: {
    textAlign: "center"
  }
}

export default feedStyle
