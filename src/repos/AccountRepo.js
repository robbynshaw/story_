class AccountRepo {
  constructor() {
    this.accounts = {}

    this.update = this.update.bind(this)
    this.get = this.get.bind(this)
  }

  update(resource, account) {
    this.accounts[resource] = account
  }

  get(username) {
    return new Promise(res => res(this.accounts[username]))
  }
}

export default AccountRepo
