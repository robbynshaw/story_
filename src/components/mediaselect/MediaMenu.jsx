import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faImage,
  faVideo,
  faHeadphones,
} from '@fortawesome/free-solid-svg-icons'

class MediaMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: 'image',
      isUpload: false,
    }

    this.onItemClick = this.onItemClick.bind(this)
    this.onSwitch = this.onSwitch.bind(this)
  }

  onItemClick(e, { name }) {
    const { onItemClick } = this.props
    const { isUpload } = this.state

    this.setState({ activeItem: name })
    onItemClick(name, isUpload)
  }

  onSwitch(isUpload) {
    const { onItemClick } = this.props
    const { activeItem } = this.state
    this.setState({ isUpload })
    onItemClick(activeItem, isUpload)
  }

  render() {
    const { isUpload, activeItem } = this.state

    return (
      <Menu pointing secondary>
        <Menu.Item
          name="image"
          active={activeItem === 'image'}
          onClick={this.onItemClick}
        >
          <FontAwesomeIcon icon={faImage} title="image" />
        </Menu.Item>
        <Menu.Item
          name="video"
          active={activeItem === 'video'}
          onClick={this.onItemClick}
        >
          <FontAwesomeIcon icon={faVideo} title="video" />
        </Menu.Item>
        <Menu.Item
          name="audio"
          active={activeItem === 'audio'}
          onClick={this.onItemClick}
        >
          <FontAwesomeIcon title="audio" icon={faHeadphones} />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item align="right">
            <Button.Group>
              <Button positive={!isUpload} onClick={() => this.onSwitch(false)}>
                Select
              </Button>
              <Button.Or></Button.Or>
              <Button positive={isUpload} onClick={() => this.onSwitch(true)}>
                Upload
              </Button>
            </Button.Group>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

MediaMenu.propTypes = {
  onItemClick: PropTypes.func,
}

MediaMenu.defaultProps = {
  onItemClick: () => {},
}

export default MediaMenu
