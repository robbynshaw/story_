class AccountRepo {
  constructor() {
    this.account = {
      lines: {
        current: 'https://story_.com/line/metadata/1',
      },
    }
  }

  get() {
    return new Promise(res => res(this.account))
  }
}

export default AccountRepo
