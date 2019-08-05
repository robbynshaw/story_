import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import MediaMenu from './MediaMenu'
import ImageUpload from './ImageUpload'
import ImageSelect from './ImageSelect'
import VideoUpload from './VideoUpload'
import VideoSelect from './VideoSelect'
import AudioUpload from './AudioUpload'
import AudioSelect from './AudioSelect'

function createWindow(item, isUpload) {
  switch (item) {
    case 'audio':
      return isUpload ? <AudioUpload /> : <AudioSelect />
    case 'video':
      return isUpload ? <VideoUpload /> : <VideoSelect />
    case 'image':
    default:
      return isUpload ? <ImageUpload /> : <ImageSelect />
  }
}

class MediaSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      window: createWindow('image', false),
    }

    this.onItemClick = this.onItemClick.bind(this)
  }

  onItemClick(item, isUpload) {
    this.setState({ window: createWindow(item, isUpload) })
  }

  render() {
    const { window } = this.state

    return (
      <>
        <Modal.Header>Insert Media . . .</Modal.Header>
        <Modal.Content>
          <MediaMenu onItemClick={this.onItemClick} />
          {window}
        </Modal.Content>
      </>
    )
  }
}

export default MediaSelect
