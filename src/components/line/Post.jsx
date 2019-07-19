import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import Unified from 'unified'
import Parse from 'remark-parse'
import Rehype from 'remark-rehype'
import Highlight from 'rehype-highlight'
import Reactify from 'rehype-react'
import { Card, Feed } from 'semantic-ui-react'

class Post extends React.Component {
  constructor(props) {
    super(props)

    this.processor = Unified()
      .use(Parse)
      .use(Rehype)
      .use(Highlight)
      .use(Reactify, { createElement: React.createElement })

    this.state = {
      date: '',
      content: '...',
    }
  }

  componentDidMount() {
    this.refreshSelf()
  }

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  populate(post) {
    this.setState(() => {
      const { title, date, content } = post

      return {
        title,
        date,
        content,
      }
    })
  }

  refreshSelf() {
    const { resource, postRepo } = this.props

    if (!resource) {
      return
    }

    postRepo
      .get(resource)
      .then(post => this.populate(post))
      .catch(err => this.onError(err))
  }

  render() {
    const { date, content } = this.state

    const htmlContent = this.processor.processSync(content).contents

    console.log(date.toString())

    return (
      <Card fluid>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                <Feed.Date content={Moment(date.toString()).fromNow()} />
                <Feed.Summary>{htmlContent}</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    )
  }
}

Post.propTypes = {
  resource: PropTypes.string.isRequired,
  postRepo: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
  onError: PropTypes.func,
}

Post.defaultProps = {
  onError: err => console.error('error', err),
}

export default Post
