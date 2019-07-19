import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import Post from './Post'

class PostList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    this.refreshItems()
  }

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  setItems(items) {
    this.setState(() => ({
      items,
    }))
  }

  refreshItems() {
    const { resource, lineRepo } = this.props

    if (!resource) {
      return
    }

    lineRepo
      .getIndex(resource)
      .then(items => this.setItems(items))
      .catch(err => this.onError(err))
  }

  render() {
    const { items } = this.state
    const { postRepo } = this.props

    const lis = items.map((item) => {
      const { resource } = item

      return <Post key={resource} resource={resource} postRepo={postRepo} />
    })

    return <Card.Group>{lis}</Card.Group>
  }
}

PostList.propTypes = {
  resource: PropTypes.string.isRequired,
  lineRepo: PropTypes.shape({
    getIndex: PropTypes.func.isRequired,
  }).isRequired,
  postRepo: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
  onError: PropTypes.func,
}

PostList.defaultProps = {
  onError: err => console.error('error', err),
}

export default PostList
