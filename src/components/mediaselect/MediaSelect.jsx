import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Menu, Radio } from 'semantic-ui-react'

class MediaSelect extends React.Component {
  render() {
    return (
      <>
        <Modal.Header>Insert Media . . .</Modal.Header>
        <Modal.Content>
          <Menu>
            <Menu.Item>Image</Menu.Item>
            <Menu.Item>Video</Menu.Item>
            <Menu.Item>Sound</Menu.Item>
            <Menu.Item>
              <Radio toggle label="Upload" />
            </Menu.Item>
          </Menu>
        </Modal.Content>
      </>
    )
  }
}

export default MediaSelect
