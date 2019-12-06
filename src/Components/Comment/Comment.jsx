import React from "react"
import PropTypes from "prop-types"
import Button from "../CustomButtons/Button"
import GridContainer from "../Grid/GridContainer"
import GridItem from "../Grid/GridItem"
import Heading from "../Heading/Heading"
import Timeline from "../Timeline/Timeline"
import Card from "../Card/Card"
import CardBody from "../Card/CardBody"

import { AuthToken } from "../../Utils"

const Formatcomments = comments => {
  const commentsArray = []

  const side = comments.length
  for (let i = 0; i < side; i += 1) {
    if (i % 2 === 0) {
      commentsArray[i] = {
        id: comments[i].commentId,
        inverted: true,
        badgeColor: "info",
        titleColor: "info",
        body: (
          <div>
            <p>{comments[i].comment}</p>
          </div>
        ),
        footer: (
          <>
            <Button round color="primary" key="a">
              flag
            </Button>
            {AuthToken.isAdmin() && (
              <Button round color="primary" key="b">
                delete
              </Button>
            )}
          </>
        )
      }
    } else {
      commentsArray[i] = {
        id: comments[i].commentId,
        badgeColor: "info",
        titleColor: "info",
        body: (
          <div>
            <p>{comments[i].comment}</p>
          </div>
        ),
        footer: (
          <>
            <Button round color="primary" key="a">
              flag
            </Button>
            {AuthToken.isAdmin() && (
              <Button round color="primary" key="b">
                delete
              </Button>
            )}
          </>
        )
      }
    }
  }
  return commentsArray
}

class Comment extends React.PureComponent {
  render() {
    const { comments } = this.props
    return (
      <div>
        <Heading title="COMMENTS" textAlign="center" />
        <GridContainer>
          <GridItem xs={12}>
            <Card plain>
              <CardBody plain>
                <Timeline stories={Formatcomments(comments)} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

Comment.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array]).isRequired
}

export default Comment
