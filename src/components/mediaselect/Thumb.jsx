import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { Progress, Dimmer, Header } from 'semantic-ui-react'

const ThumbContainer = Styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  max-width: 300px;
  max-height: 300px;
  padding: 10px;
  box-sizing: border-box;
`

const ThumbInner = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
`

const ThumbImg = Styled.img`
  display: block;
  width: auto;
  height: 100%;
`

// TODO Calculate width
const StyledProgress = Styled(Progress)`
  width: 200px;
`

const Thumb = ({ url, isLoading, percent }) => (
  <Dimmer.Dimmable as={ThumbContainer} blurring dimmed={isLoading}>
    <ThumbInner>
      <ThumbImg src={url} />
    </ThumbInner>
    <Dimmer active={isLoading}>
      <Header>
        <StyledProgress
          percent={percent}
          progress
          color="green"
          active={percent < 100.0}
        />
      </Header>
    </Dimmer>
  </Dimmer.Dimmable>
)

Thumb.propTypes = {
  url: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  percent: PropTypes.number,
}

Thumb.defaultProps = {
  isLoading: false,
  percent: 0,
}

export default Thumb
