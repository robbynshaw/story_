import React from 'react'
import PropTypes from 'prop-types'
import PostList from './PostList'

class Line extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      title, index, postRepo, lineRepo,
    } = this.props

    return (
      <>
        <h1>{title}</h1>
        {index && (
          <PostList resource={index} postRepo={postRepo} lineRepo={lineRepo} />
        )}
      </>
    )
  }
}

Line.propTypes = {
  resource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  lineRepo: PropTypes.shape({
    getMetadata: PropTypes.func.isRequired,
    getIndex: PropTypes.func.isRequired,
  }).isRequired,
  postRepo: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
}

export default Line
