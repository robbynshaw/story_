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

    this.onError = this.onError.bind(this)
    this.setItems = this.setItems.bind(this)
    this.onPostAdd = this.onPostAdd.bind(this)
    this.hookupEvents = this.hookupEvents.bind(this)
    this.refreshItems = this.refreshItems.bind(this)
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
      items: {
        raw: [...items.raw],
      },
    }))
  }

  onPostAdd(update) {
    const { item } = update
    console.log('Subscribed line received update', update)

    this.setState((state) => {
      const {
        items: { raw },
      } = state
      const newRaw = [...raw]
      newRaw.push(item)
      return {
        items: {
          raw: newRaw,
        },
      }
    })
  }

  hookupEvents(lineRepo, resource) {
    lineRepo.events.off('post.add', this.onPostAdd)
    lineRepo.events.on('post.add', this.onPostAdd)
  }

  async refreshItems() {
    const { resource, lineRepo } = this.props

    if (!resource) {
      return
    }

    this.hookupEvents(lineRepo, resource)

    const items = await lineRepo.getIndex(resource)
    this.setItems(items)
  }

  render() {
    let {
      items: { raw },
    } = this.state
    const { postRepo } = this.props

    raw = raw || []

    const lis = raw.map((item) => {
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
