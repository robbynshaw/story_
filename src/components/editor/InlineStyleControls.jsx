// Edited from https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/rich/rich.html

import React from 'react'
import PropTypes from 'prop-types'
import StyleButton from './StyleButton'

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

const InlineStyleControls = (props) => {
  const {
    editorState: { getCurrentInlineStyle },
    onToggle,
  } = props

  const currentStyle = getCurrentInlineStyle()
  let tabIndex = -1

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => {
        tabIndex += 1
        return (
          <StyleButton
            tabIndex={tabIndex}
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={s => onToggle(s)}
            style={type.style}
          />
        )
      })}
    </div>
  )
}

InlineStyleControls.propTypes = {
  onToggle: PropTypes.func.isRequired,
  editorState: PropTypes.shape({
    getCurrentInlineStyle: PropTypes.func.isRequired,
    getCurrentContent: PropTypes.func.isRequired,
    getSelection: PropTypes.func.isRequired,
  }).isRequired,
}

export default InlineStyleControls
