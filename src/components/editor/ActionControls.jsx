import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

class ActionControls extends React.Component {
  constructor(props) {
    super(props)

    this.onSave = this.onSave.bind(this)
    this.onSwitch = this.onSwitch.bind(this)
  }

  onSave() {
    const { onSave } = this.props
    onSave()
  }

  onSwitch() {
    const { onSwitch } = this.props
    onSwitch()
  }

  render() {
    return (
      <div className="RichEditor-controls">
        <Button content="Save" onClick={this.onSave} />
        <Button content="Raw" onClick={this.onSwitch} />
      </div>
    )
  }
}

ActionControls.propTypes = {
  onSave: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
}

export default ActionControls
