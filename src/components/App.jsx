import React from 'react'
import { Container, MenuItem } from 'semantic-ui-react'
import RepoFactory from 'src/repos/RepoFactory'
import TopMenuBar from './commons/TopMenuBar'
import EditableLine from './line/EditableLine'
import LineWrapper from './line/LineWrapper'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.accountRepo = RepoFactory.getAccountRepo()
    this.lineRepo = RepoFactory.getLineRepo()
    this.postRepo = RepoFactory.getPostRepo()

    this.state = {
      currentLine: '',
      lineMeta: {},
      error: null,
    }
  }

  componentDidMount() {
    this.refreshFromUser()
  }

  setError(err) {
    this.setState({ error: err }, () => {
      const { error } = this.state
      console.error(error)
    })
  }

  refreshFromUser() {
    this.accountRepo
      .get()
      .then(userdata => this.loadFromUserData(userdata))
      .catch(err => this.setError(err))
  }

  loadFromUserData(userdata) {
    const {
      lines: {
        current: { uri, meta },
      },
    } = userdata

    this.setState({
      currentLine: uri,
      lineMeta: meta,
    })
  }

  render() {
    const { currentLine, lineMeta } = this.state

    return (
      <LineWrapper {...lineMeta}>
        <TopMenuBar>
          <MenuItem header>Story_ (aka Storyline)</MenuItem>
        </TopMenuBar>
        <Container text style={{ margin: '2em' }}>
          {currentLine && (
            <EditableLine
              resource={currentLine}
              postRepo={this.postRepo}
              lineRepo={this.lineRepo}
            />
          )}
        </Container>
      </LineWrapper>
    )
  }
}

export default App
