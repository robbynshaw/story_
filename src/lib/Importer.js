import RepoFactory from '../repos/RepoFactory'

// Private functions
function importKeyData(repo, obj, onItem) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const item = obj[key]
      onItem(key, item)
    }
  }
}

function importAccounts(repo, accounts) {
  if (accounts) {
    importKeyData(repo, accounts, repo.update)
  }
}

function importPosts(repo, posts) {
  if (posts) {
    importKeyData(repo, posts, repo.update)
  }
}

function importLines(repo, lineData) {
  const { indices, lines } = lineData

  if (indices) {
    importKeyData(repo, indices, repo.updateIndex)
  }

  if (lines) {
    importKeyData(repo, lines, repo.updateMetadata)
  }
}

class Importer {
  constructor() {
    this.lineRepo = RepoFactory.getLineRepo()
    this.postRepo = RepoFactory.getPostRepo()
    this.accountRepo = RepoFactory.getAccountRepo()

    this.importSeparateJson = this.importSeparateJson.bind(this)
    this.importSingleJson = this.importSingleJson.bind(this)
    this.importSingle = this.importSingle.bind(this)
  }

  importSeparateJson(jsonCol) {
    const accounts = JSON.parse(jsonCol.accounts || '{}')
    const posts = JSON.parse(jsonCol.posts || '{}')
    const lines = JSON.parse(jsonCol.lines || '{}')

    this.importSingle({
      accounts,
      posts,
      lines,
    })
  }

  importSingleJson(singleJson) {
    const col = JSON.parse(singleJson)
    this.importSingle(col)
  }

  importSingle(col) {
    importAccounts(this.accountRepo, col.accounts)
    importPosts(this.postRepo, col.posts)
    importLines(this.lineRepo, col.lines)
  }
}

export default Importer
