const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const appEntries = ['./src/index.jsx']

module.exports = merge(common, {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  entry: {
    app: appEntries,
  },
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.jsx$/,
        use: [
          { loader: 'react-hot-loader/webpack' },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
              sourceMap: true,
            },
          },
        ],
      },
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'], sourceMap: true },
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 3050,

    // respond to 404s with index.html
    historyApiFallback: true,

    // enable HMR on the server
    hot: true,
  },
})
