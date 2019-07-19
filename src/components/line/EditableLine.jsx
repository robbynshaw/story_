import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Line from './Line'
import PostEditor from './PostEditor'

const EditorContainer = styled.div`
  margin-top: 2em;
`

class EditableLine extends React.Component {
  componentDidMount() {
    this.scrollToEditor()
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

  render() {
    const { resource, postRepo, lineRepo } = this.props

    return (
      <div>
        {resource && (
          <Line resource={resource} postRepo={postRepo} lineRepo={lineRepo} />
        )}
        <EditorContainer ref={el => this.setEditorElement(el)}>
          <PostEditor resource={resource} />
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
