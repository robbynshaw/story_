import React from 'react'
import { Container, Menu, MenuItem } from 'semantic-ui-react'
import EditableLine from './line/EditableLine'
import RepoFactory from '../repos/RepoFactory'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.accountRepo = RepoFactory.getAccountRepo()
    this.lineRepo = RepoFactory.getLineRepo()
    this.postRepo = RepoFactory.getPostRepo()

    this.state = {
      currentLine: '',
      error: null,
    }
  }

  componentDidMount() {
    this.refreshFromUser()
  }

  setError(err) {
    console.error(err)
    this.state.error = err
  }

  refreshFromUser() {
    this.accountRepo
      .get()
      .then(userdata => this.loadFromUserData(userdata))
      .catch(err => this.setError(err))
  }

  loadFromUserData(userdata) {
    const {
      lines: { current },
    } = userdata

    this.state.currentLine = current
    this.setState(() => ({
      currentLine: current,
    }))
  }

  render() {
    const { currentLine } = this.state

    return (
      <div>
        <Menu>
          <MenuItem header>Story_ (aka Storyline)</MenuItem>
        </Menu>
        <Container text style={{ margin: '2em' }}>
          {currentLine && (
            <EditableLine
              resource={currentLine}
              postRepo={this.postRepo}
              lineRepo={this.lineRepo}
            />
          )}
        </Container>
      </div>
    )
  }
}

export default App