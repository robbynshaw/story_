// Edited from https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/rich/rich.html

import React from 'react'
import PropTypes from 'prop-types'
import StyleButton from './StyleButton'

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
  { label: 'Img', style: 'media' },
]

const BlockStyleControls = (props) => {
  const { editorState, onToggle } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  let tabIndex = -1

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => {
        tabIndex += 1
        return (
          <StyleButton
            tabIndex={tabIndex}
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        )
      })}
    </div>
  )
}

BlockStyleControls.propTypes = {
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func.isRequired,
    getCurrentContent: PropTypes.func.isRequired,
    getSelection: PropTypes.func.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default BlockStyleControls
