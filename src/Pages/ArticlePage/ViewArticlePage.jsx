import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Moment from "react-moment"
import withStyles from "@material-ui/core/styles/withStyles"
import Delete from "@material-ui/icons/Delete"
import Edit from "@material-ui/icons/Edit"
import Skeleton from "@material-ui/lab/Skeleton"
import GridContainer from "../../Components/Grid/GridContainer"
import GridItem from "../../Components/Grid/GridItem"
import Button from "../../Components/CustomButtons/Button"
import Card from "../../Components/Card/Card"
import CardBody from "../../Components/Card/CardBody"
import CardFooter from "../../Components/Card/CardFooter"
import feedStyle from "../../Style/Pages/feedStyle"
import { ArticleAction } from "../../redux/actions"

const propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  getArticle: PropTypes.func.isRequired,
  articleData: PropTypes.oneOfType([PropTypes.object]),
  match: PropTypes.oneOfType([PropTypes.object]).isRequired
}

const defaultProps = {
  articleData: {}
}

const mapStateToProps = state => ({
  articleData: state.article.specificArticleData.data || {},
  error: state.article.error || {}
})

const mapActionCreators = {
  getArticle: ArticleAction.getArticle
}

class ViewArticlePage extends React.PureComponent {
  componentDidMount() {
    const { getArticle, match } = this.props
    const { id } = match.params
    getArticle(id)
  }

  render() {
    const { classes, articleData } = this.props
    const { article, title, createdOn } = articleData

    return (
      <div>
        <GridContainer justify="center">
          {article ? (
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardBody>
                  <h3 className={classes.center}>{title}</h3>
                  <div>{article}</div>
                </CardBody>
                <CardFooter product>
                  <div className={classes.date}>
                    <Moment fromNow>{createdOn}</Moment>
                  </div>
                  <div>
                    <Button
                      color="primary"
                      round
                      className={classes.marginRight}
                    >
                      <Edit className={classes.icons} /> EDIT
                    </Button>
                    <Button
                      color="primary"
                      round
                      className={classes.marginRight}
                    >
                      <Delete className={classes.icons} /> DELETE
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={12}>
              <Skeleton variant="rect" height={300}>
                <Skeleton height={10} width="25%" className={classes.center} />
                <Skeleton height={10} style={{ marginBottom: 8 }} />
                <Skeleton height={10} style={{ marginBottom: 8 }} />
                <Skeleton height={10} style={{ marginBottom: 8 }} />
                <Skeleton height={10} style={{ marginBottom: 8 }} />
                <Skeleton height={10} style={{ marginBottom: 8 }} />
                <Skeleton height={10} style={{ marginBottom: 8 }} />
                <Skeleton height={10} width="80%" />
              </Skeleton>
            </GridItem>
          )}
        </GridContainer>
      </div>
    )
  }
}

ViewArticlePage.propTypes = propTypes
ViewArticlePage.defaultProps = defaultProps

export default connect(
  mapStateToProps,
  mapActionCreators
)(withStyles(feedStyle)(ViewArticlePage))
