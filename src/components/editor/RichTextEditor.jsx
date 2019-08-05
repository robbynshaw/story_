// Edited from https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/rich/rich.html

import React from 'react'
import PropTypes from 'prop-types'
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
} from 'draft-js'
import { draftToMarkdown } from 'markdown-draft-js'
import { Menu } from 'semantic-ui-react'
import BlockStyleControls from './BlockStyleControls'
import ActionControls from './ActionControls'
// import InlineStyleControls from './InlineStyleControls'

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'
    default:
      return null
  }
}

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props)

    const { placeholder } = props
    this.el = null
    this.state = {
      editorState: EditorState.createEmpty(),
      placeholder,
      currentMd: '',
    }
    this.setElement = (el) => {
      this.el = el
    }
    this.focus = () => this.el.focus()
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.mapKeyToEditorCommand = this.mapKeyToEditorCommand.bind(this)
    this.toggleBlockType = this.toggleBlockType.bind(this)
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this)
    this.clearPlaceholder = this.clearPlaceholder.bind(this)
  }

  onChange(editorState) {
    this.setState({ editorState })

    const raw = convertToRaw(editorState.getCurrentContent())
    const md = draftToMarkdown(raw)
    this.setState({ currentMd: md })
  }

  onSave() {
    const { onSave } = this.props
    onSave(this.state.currentMd)
  }

  clearPlaceholder() {
    this.setState(state => ({
      editorState: state.editorState,
      placeholder: null,
      currentMd: state.currentMd,
    }))
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  mapKeyToEditorCommand(e) {
    const { editorState } = this.state

    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */)
      if (newEditorState !== editorState) {
        this.onChange(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(e)
  }

  toggleBlockType(blockType) {
    const { editorState } = this.state
    const { onMediaSelect } = this.props

    if (blockType === 'media') {
      onMediaSelect()
      return
    }

    this.onChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  toggleInlineStyle(inlineStyle) {
    const { editorState } = this.state
    this.onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  render() {
    const { editorState, placeholder } = this.state

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'
    const contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    return (
      <div className="RichEditor-root">
        <Menu secondary>
          <Menu.Item>
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
          </Menu.Item>
          {/* <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        /> */}
          <Menu.Menu position="right">
            <ActionControls
              onSave={this.onSave}
              onSwitch={() => console.log('Switched')}
            />
          </Menu.Menu>
        </Menu>
        <div role="editor" className={className} onClick={this.focus}>
          <Editor
            onFocus={this.clearPlaceholder}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder={placeholder}
            ref={this.setElement}
            spellCheck
          />
        </div>
      </div>
    )
  }
}

RichTextEditor.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onMediaSelect: PropTypes.func,
  onSave: PropTypes.func,
}

RichTextEditor.defaultProps = {
  onMediaSelect: () => {},
  onSave: () => {},
}

export default RichTextEditor
