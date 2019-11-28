import { cardTitle } from "../Genaral/GeneralStyle"

import hoverCardStyle from "../Genaral/hoverCardStyle"

const feedStyle = {
  ...hoverCardStyle,
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
  }
}

export default feedStyle
