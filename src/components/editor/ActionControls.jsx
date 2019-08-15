import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

class ActionControls extends React.Component {
  constructor(props) {
    super(props)

    this.onSave = this.onSave.bind(this)
  }

  onSave() {
    const { onSave } = this.props
    onSave()
  }

  render() {
    return (
      <div className="RichEditor-controls">
        <Button icon onClick={this.onSave} labelPosition="left">
          <Icon name="save" />
          Save
        </Button>
      </div>
    )
  }
}

ActionControls.propTypes = {
  onSave: PropTypes.func.isRequired,
}

export default ActionControls
