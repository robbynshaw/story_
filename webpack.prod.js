const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const appEntries = ['./src/index.jsx']

module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: appEntries,
  },
})
