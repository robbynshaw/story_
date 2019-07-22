import UUID from 'uuid'
import Emitter from 'emittery'

class LineRepo {
  constructor(postRepo) {
    this.lines = {}
    this.indices = {}
    this.root = 'https://story_.com/line/'

    this.postRepo = postRepo

    this.createIndexItem = this.createIndexItem.bind(this)
    this.createEmptyIndex = this.createEmptyIndex.bind(this)
    this.createNewLine = this.createNewLine.bind(this)
    this.add = this.add.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
    this.updateMetadata = this.updateMetadata.bind(this)
    this.getMetadata = this.getMetadata.bind(this)
    this.getIndex = this.getIndex.bind(this)
    this.addPost = this.addPost.bind(this)
    this.addSavedPost = this.addSavedPost.bind(this)
    this.events = new Emitter()
  }

  createIndexItem(post, resource) {
    return {
      date: post.date,
      resource,
    }
  }

  createEmptyIndex() {
    return {
      raw: [],
    }
  }

  createNewLine(title, idxResource) {
    return {
      title,
      index: idxResource,
    }
  }

  add(title) {
    const mdId = UUID()
    const idxId = UUID()
    const mdResource = `${this.root}metadata/${mdId}`
    const idxResource = `${this.root}idx/${idxId}`

    const idx = this.createEmptyIndex()
    const line = this.createNewLine(title, idxResource)
    this.indices[idxResource] = idx
    this.lines[mdResource] = line
    return new Promise(res => res(line, idx))
  }

  updateIndex(resource, index) {
    this.indices[resource] = index
    this.events.emit('index.update', { resource, index })
    return new Promise(res => res(resource, index))
  }

  updateMetadata(resource, line) {
    this.lines[resource] = line
    this.events.emit('line.update', { resource, line })
    return new Promise(res => res(resource, line))
  }

  getMetadata(uri) {
    return new Promise(res => res(this.lines[uri]))
  }

  getIndex(uri) {
    return new Promise(res => res(this.indices[uri]))
  }

  async addPost(lineUri, post) {
    console.log('Saving post', { lineUri, post })
    if (!post || !post.content) {
      throw new Error('Nothing to save')
    }

    post.date = new Date()
    const { post: savedPost, resource } = await this.postRepo.add(post)
    await this.addSavedPost(savedPost, resource, lineUri)
  }

  async addSavedPost(post, resource, lineUri) {
    const metadata = await this.getMetadata(lineUri)

    if (!metadata) {
      throw new Error(`Unable to find metadata for '${lineUri}'`)
    }
    console.log('resource', resource)
    const { index } = metadata
    const { raw: indexItems } = await this.getIndex(index)
    const item = this.createIndexItem(post, resource)
    console.log(indexItems)
    indexItems.push(item)
    this.events.emit('post.add', {
      item, indexItems, post, resource,
    })
    return new Promise(res => res(indexItems, post))
  }
}

export default LineRepo
