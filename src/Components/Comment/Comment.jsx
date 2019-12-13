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

class Comment extends React.PureComponent {
  Formatcomments = comments => {
    const { handleFlagCommentButton, isArticleFlag } = this.props
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
              <Button
                round
                color="primary"
                disabled={isArticleFlag}
                onClick={() =>
                  handleFlagCommentButton(
                    comments[i].authorId,
                    true,
                    comments[i].commentId
                  )
                }
              >
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
              <Button
                round
                disabled={isArticleFlag}
                color="primary"
                onClick={() =>
                  handleFlagCommentButton(
                    comments[i].authorId,
                    true,
                    comments[i].commentId
                  )
                }
              >
                flag
              </Button>
              {AuthToken.isAdmin() && (
                <Button round color="primary">
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

  render() {
    const { comments } = this.props
    return (
      <div>
        <Heading title="COMMENTS" textAlign="center" />
        <GridContainer>
          <GridItem xs={12}>
            <Card plain>
              <CardBody plain>
                <Timeline stories={this.Formatcomments(comments)} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

Comment.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array]).isRequired,
  handleFlagCommentButton: PropTypes.func.isRequired,
  isArticleFlag: PropTypes.bool.isRequired
}

export default Comment
