import React from 'react'
import { Container, MenuItem, Modal } from 'semantic-ui-react'
import RepoFactory from 'src/repos/RepoFactory'
import TopMenuBar from './commons/TopMenuBar'
import EditableLine from './line/EditableLine'
import Importer from 'src/lib/Importer'
import accounts from 'src/testdata/accounts'
import lines from 'src/testdata/lines'
import posts from 'src/testdata/posts'
import LineWrapper from './line/LineWrapper'
import createWindow from './createWindow';

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
      modal: {
        open: false,
        content: undefined,
      }
    }

    this.onModalOpen = this.onModalOpen.bind(this)
    this.closeModal = this.closeModal.bind(this)

    // Import test data
    if (process.env.NODE_ENV === 'development') {
      const importer = new Importer()
      importer.importSingle({
        accounts,
        posts,
        lines,
      })
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
      .get('testy')
      .then(userdata => this.loadFromUserData(userdata))
      .catch(err => this.setError(err))
  }

  onModalOpen(name, props) {
    console.log('onModalOpen called')
    const content = createWindow(name, props)
    this.setState({modal: {open: true, content: content }})
  }

  closeModal() {
    this.setState({modal: {open: false, content: null}})
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
    const { currentLine, lineMeta, modal: { open, content } } = this.state

    return (
      <LineWrapper {...lineMeta}>
        <TopMenuBar>
          <MenuItem header>story-line</MenuItem>
        </TopMenuBar>
        <Container text style={{ margin: '2em' }}>
          {currentLine && (
            <EditableLine
              resource={currentLine}
              postRepo={this.postRepo}
              lineRepo={this.lineRepo}
              onModalOpen={this.onModalOpen}
            />
          )}
        </Container>
        <Modal open={open} dimmer='blurring' closeIcon closeOnDimmerClick={true} closeOnEscape={true} onClose={this.closeModal}>
          {content}
        </Modal>
      </LineWrapper>
    )
  }
}

export default App
