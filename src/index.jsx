import { hot } from 'react-hot-loader/root'
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'semantic-ui-css/semantic.min.css'

export default hot(App)
render(<App />, document.querySelector('#root'))
