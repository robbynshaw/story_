// Edited from https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/rich/rich.html

import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode,
  faPhotoVideo,
  faListUl,
  faListOl,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import StyleButton from './StyleButton'

const BLOCK_TYPES = [
  { label: <strong>H1</strong>, style: 'header-one' },
  { label: <strong>H2</strong>, style: 'header-two' },
  { label: <strong>H3</strong>, style: 'header-three' },
  { label: <strong>H4</strong>, style: 'header-four' },
  {
    label: <FontAwesomeIcon icon={faQuoteRight} title="BlockQuote" />,
    style: 'blockquote',
  },
  {
    label: <FontAwesomeIcon icon={faListUl} title="Unordered list" />,
    style: 'unordered-list-item',
  },
  {
    label: <FontAwesomeIcon icon={faListOl} title="Ordered list" />,
    style: 'ordered-list-item',
  },
  {
    label: <FontAwesomeIcon icon={faCode} title="Code block" />,
    style: 'code-block',
  },
  {
    label: <FontAwesomeIcon icon={faMarkdown} title="Switch to markdown" />,
    style: 'markdown',
  },
  {
    label: <FontAwesomeIcon icon={faPhotoVideo} title="Insert media" />,
    style: 'media',
  },
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
            key={type.style}
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
