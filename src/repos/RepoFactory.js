/*
  This is a simple repo factory that uses a bunch of in memory repos
  for development purposes
*/

import AccountRepo from './AccountRepo'
import LineRepo from './LineRepo'
import PostRepo from './PostRepo'
import StaticServices from '../lib/StaticServices'

function createRepoFactory() {
  const accountRepo = new AccountRepo()
  const postRepo = new PostRepo()
  const lineRepo = new LineRepo(postRepo)

  return {
    getAccountRepo() {
      return accountRepo
    },
    getLineRepo() {
      return lineRepo
    },
    getPostRepo() {
      return postRepo
    },
  }
}

export default StaticServices.get('repoFactory', createRepoFactory)
