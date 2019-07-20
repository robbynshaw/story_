import React from 'react'
import { Card } from 'semantic-ui-react'
import RichTextEditor from './RichTextEditor'
// import Editor from 'draft-js-plugins-editor'
// import createMarkdownPlugin from 'draft-js-markdown-plugin'
// import { EditorState, RichUtils } from 'draft-js'
// import BlockStyleControls from './BlockStyleControls'
import './post-editor.css'

const famousFirstLines = [
  'If you can keep your head when all about you...',
  'I must go down to the seas again, to the lonely sea and the sky,...',
  'Half a league, half a league,...',
  'Midway upon the journey of our life...',
  'Whose woods these are I think I know...',
  'Much have I travelled in the realms of gold,...',
  'How do I love thee? Let me count the ways.',
  'In Xanadu did Kubla Khan...',
  "Sing, goddess, of Achilles' ruinous anger...",
  "O MY Luve's like a red, red rose...",
]

class PostEditor extends React.Component {
  constructor(props) {
    super(props)

    const i = Math.floor(Math.random() * famousFirstLines.length)
    const firstLine = famousFirstLines[i]

    this.state = {
      placeholder: firstLine,
      // editorState: EditorState.createEmpty(),
      // plugins: [createMarkdownPlugin()],
    }
  }

  render() {
    const { placeholder } = this.state

    return (
      <Card fluid>
        <Card.Content>
          <RichTextEditor placeholder={placeholder} />
        </Card.Content>
      </Card>
    )
  }
}

export default PostEditor
