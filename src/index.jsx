import { hot } from 'react-hot-loader/root'
import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

const Banner = styled.h1`
  font-family: 'Segoe UI', sans-serif;
  font-size: 24px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 26.4px;
`
const App = () => <Banner>Welcome to StoryLine!</Banner>

export default hot(App)
render(<App />, document.querySelector('#root'))
