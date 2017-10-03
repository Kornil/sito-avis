const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');


const APP_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

const config = {
  entry: {
     main: APP_DIR + '/index.jsx',
     vendor: [
       'react', 'react-dom', 'firebase'
     ]
   },
  output: {
    path: DIST_DIR,
    filename: '[name].[hash:8].js',
    chunkFilename: '[id].[hash:8].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader?sourceMap', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader?sourceMap', 'css-loader', 'sass-loader']
      },
      {
        test:/\.(jpg|png|gif|bmp|svg)$/,
        loader: require.resolve("file-loader")
      }
    ],
    noParse: /node_modules\/quill\/dist/
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
    new BundleAnalyzerPlugin({
      defaultSizes: 'parsed',
    }),
    new HtmlWebpackPlugin({
       title: 'Caching'
      }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
       name: 'vendor'
     }),
    new webpack.optimize.CommonsChunkPlugin({
       name: 'runtime'
     }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  }
}

module.exports = config;
