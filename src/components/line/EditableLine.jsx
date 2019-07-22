import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Line from './Line'
import PostEditor from '../editor/PostEditor'

const EditorContainer = styled.div`
  margin-top: 2em;
`

class EditableLine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      line: {},
    }

    this.setEditorElement = this.setEditorElement.bind(this)
    this.scrollToEditor = this.scrollToEditor.bind(this)
    this.onError = this.onError.bind(this)
    this.populate = this.populate.bind(this)
    this.refreshCurrentLine = this.refreshCurrentLine.bind(this)
    this.loadFromMetadata = this.loadFromMetadata.bind(this)
  }

  componentDidMount() {
    this.refreshCurrentLine()
  }

  componentDidUpdate() {
    this.scrollToEditor()
  }

  setEditorElement(el) {
    this.editorElement = el
  }

  scrollToEditor() {
    this.editorElement.scrollIntoView({ behavior: 'smooth' })
  }

  onError(err) {
    const { onError } = this.props
    onError(err)
  }

  populate(metadata) {
    this.setState(() => {
      const { title, index } = metadata
      return {
        line: {
          title,
          index,
        },
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
      .then(this.loadFromMetadata)
      .catch(this.onError)
  }

  loadFromMetadata(metadata) {
    if (!metadata) {
      this.onError('Unable to refresh current line. No metadata found')
      return
    }
    this.populate(metadata)
  }

  render() {
    const { resource, postRepo, lineRepo } = this.props
    const {
      line: { title, index },
    } = this.state

    console.log('rendering editable', this.state)

    return (
      <div>
        {resource && title && (
          <Line
            title={title}
            resource={resource}
            index={index}
            postRepo={postRepo}
            lineRepo={lineRepo}
          />
        )}
        <EditorContainer ref={this.setEditorElement}>
          <PostEditor resource={resource} lineRepo={lineRepo} />
        </EditorContainer>
      </div>
    )
  }
}

EditableLine.propTypes = {
  resource: PropTypes.string.isRequired,
  lineRepo: PropTypes.shape({
    getMetadata: PropTypes.func.isRequired,
    getIndex: PropTypes.func.isRequired,
  }).isRequired,
  postRepo: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
}

export default EditableLine
