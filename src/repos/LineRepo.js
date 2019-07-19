const lines = {
  'https://story_.com/line/metadata/1': {
    title: 'My Storyline',
    index: 'https://story_.com/line/idx/1',
  },
}

const indices = {
  'https://story_.com/line/idx/1': [
    {
      date: Date('2019-01-15 01:12:11'),
      resource: 'https://story_.com/posts/1',
    },
    {
      date: Date('2019-01-15 01:12:11'),
      resource: 'https://story_.com/posts/2',
    },
    {
      date: Date('2019-01-15 01:12:11'),
      resource: 'https://story_.com/posts/3',
    },
    {
      date: Date('2019-01-15 01:12:11'),
      resource: 'https://story_.com/posts/4',
    },
    {
      date: Date('2019-01-15 01:12:11'),
      resource: 'https://story_.com/posts/5',
    },
  ],
}

class LineRepo {
  constructor() {
    this.lines = lines
    this.indices = indices
  }

  getMetadata(uri) {
    return new Promise(res => res(this.lines[uri]))
  }

  getIndex(uri) {
    return new Promise(res => res(this.indices[uri]))
  }
}

export default LineRepo
