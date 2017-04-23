const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src/client');
const DIST_DIR = path.resolve(__dirname, 'dist');

const config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = config;