import React from 'react'
import PropTypes from 'prop-types'
import PostList from './PostList'

class Line extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Loading...',
      index: '',
    }
  }

  componentDidMount() {
    this.refreshCurrentLine()
  }

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  populate(metadata) {
    this.setState(() => {
      const { title, index } = metadata
      return {
        title,
        index,
      }
    })
  }

  refreshCurrentLine() {
    const { resource, lineRepo } = this.props

    if (!resource) {
      return
    }

    lineRepo
      .getMetadata(resource)
      .then(metadata => this.loadFromMetadata(metadata))
      .catch(err => this.onError(err))
  }

  loadFromMetadata(metadata) {
    if (!metadata) {
      this.onError('Unable to refresh current line. No metadata found')
      return
    }
    this.populate(metadata)
  }

  render() {
    const { postRepo, lineRepo } = this.props
    const { title, index } = this.state

    return (
      <div>
        <h1>{title}</h1>
        {index && (
          <PostList resource={index} postRepo={postRepo} lineRepo={lineRepo} />
        )}
      </div>
    )
  }
}

Line.propTypes = {
  resource: PropTypes.string.isRequired,
  lineRepo: PropTypes.shape({
    getMetadata: PropTypes.func.isRequired,
    getIndex: PropTypes.func.isRequired,
  }).isRequired,
  postRepo: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
  onError: PropTypes.func,
}

Line.defaultProps = {
  onError: err => console.error('error', err),
}

export default Line
