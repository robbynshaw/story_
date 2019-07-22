import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'

const style = {
  borderRadius: 0,
  borderBottom: '1px solid rgba(34,36,38,.15)',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
}

const TopMenuBar = ({ children }) => <Menu style={style}>{children}</Menu>

TopMenuBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

TopMenuBar.defaultProps = () => ({
  children: null,
})

export default TopMenuBar
