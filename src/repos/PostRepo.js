import UUID from 'uuid'
import Emitter from 'emittery'

class PostRepo {
  constructor() {
    this.posts = {}
    this.root = 'https://story_.com/posts/'

    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
    this.get = this.get.bind(this)
    this.events = new Emitter()
  }

  add(post) {
    const uuid = UUID()
    const resource = `${this.root}${uuid}`
    this.posts[resource] = post

    const update = { post, resource }
    this.events.emit('post.add', update)
    return new Promise(res => res(update))
  }

  update(resource, post) {
    this.posts[resource] = post
    this.events.emit('post.update', { post, resource })
    return new Promise(res => res(post, resource))
  }

  get(id) {
    return new Promise(res => res(this.posts[id]))
  }
}

export default PostRepo
