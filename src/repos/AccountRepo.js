class AccountRepo {
  constructor() {
    this.account = {
      lines: {
        current: {
          uri: 'https://story_.com/line/metadata/1',
          meta: {
            styles: {
              backgroundColor: '#f7feff',
            },
          },
        },
      },
    }
  }

  get() {
    return new Promise(res => res(this.account))
  }
}

export default AccountRepo
