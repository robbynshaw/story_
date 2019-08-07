// From https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/rich/rich.html

import React from 'react'
import PropTypes from 'prop-types'

class StyleButton extends React.Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      const { onToggle, style } = this.props
      e.preventDefault()
      onToggle(style)
    }
  }

  render() {
    let className = 'RichEditor-styleButton'
    const { active, label, tabIndex } = this.props

    if (active) {
      className += ' RichEditor-activeButton'
    }

    return (
      <span
        role="button"
        tabIndex={tabIndex}
        className={className}
        onMouseDown={this.onToggle}
      >
        {label}
      </span>
    )
  }
}

StyleButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  tabIndex: PropTypes.number.isRequired,
}

export default StyleButton
