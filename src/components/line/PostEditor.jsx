import React from 'react'
import { Form, TextArea } from 'semantic-ui-react'

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

const PostEditor = () => {
  const i = Math.floor(Math.random() * famousFirstLines.length)
  const firstLine = famousFirstLines[i]

  return (
    <Form>
      <Form.Group>
        <TextArea placeholder={firstLine} />
      </Form.Group>
      <Form.Button content="Add" />
    </Form>
  )
}

export default PostEditor
