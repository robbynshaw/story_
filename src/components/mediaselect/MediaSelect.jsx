import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Styled from 'styled-components'
import MediaMenu from './MediaMenu'
import ImageUpload from './ImageUpload'
import ImageSelect from './ImageSelect'
import VideoUpload from './VideoUpload'
import VideoSelect from './VideoSelect'
import AudioUpload from './AudioUpload'
import AudioSelect from './AudioSelect'

const SpinnerContainer = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Spinner = () => (
  <SpinnerContainer>
    <FontAwesomeIcon icon={faSpinner} size="3x" spin />
  </SpinnerContainer>
)

function createWindow(item, isUpload, callback) {
  switch (item) {
    case 'audio':
      return isUpload ? <AudioUpload /> : <AudioSelect />
    case 'video':
      return isUpload ? <VideoUpload /> : <VideoSelect />
    case 'image':
    default:
      return isUpload ? <ImageUpload onUpload={callback} /> : <ImageSelect />
  }
}

class MediaSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      window: createWindow('image', false),
    }

    this.onItemClick = this.onItemClick.bind(this)
    this.onMediaInsert = this.onMediaInsert.bind(this)
  }

  onItemClick(item, isUpload) {
    this.setState({ window: createWindow(item, isUpload, this.onMediaInsert) })
  }

  onMediaInsert(media) {
    const { onSelect } = this.props
    this.setState({
      window: <Spinner />,
    })
    onSelect(media)
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

MediaSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
}

export default MediaSelect
