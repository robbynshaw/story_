import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LineWrapper = styled.div`
  background: ${props => props.backgroundColor};
  height: 100%;
`

const wrapper = ({ children, styles }) => (
  <LineWrapper {...styles}>{children}</LineWrapper>
)

wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  styles: PropTypes.shape({
    backgroundColor: PropTypes.string,
  }),
}

wrapper.defaultProps = () => ({
  children: null,
  styles: {
    backgroundColor: 'white',
  },
})

export default wrapper
