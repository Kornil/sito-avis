const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');


const APP_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

const isExternal = (module) => {
  const context = module.context;

  if (typeof context !== 'string') {
    return false;
  }

  return context.indexOf('node_modules') !== -1;
}

const config = {
  entry: {
    main: APP_DIR + '/index.jsx',
    vendors: ['firebase', 'react','react-dom', 'react-router', 'react-router-dom', 'react-redux', 'lodash', 'history'],
    adminVendors: ['quill', 'react-quill', 'packery', 'react-packery-component', 'react-table', 'react-modal', 'draggabilly', 'react-dropzone'],
    // createblog: APP_DIR + '/components/CreateBlog.jsx',
    // modal: APP_DIR + '/components/ModalGuts.jsx',
    // createphotogallery: APP_DIR + '/components/CreatePhotoGallery.jsx',
    // galleryindex: APP_DIR + '/components/GalleryIndex.jsx',
    // blogsindex: APP_DIR + '/components/BlogsIndex.jsx',
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
    // new HtmlWebpackPlugin({
    //    title: 'Caching'
    //   }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name : "adminCommons",
      chunks: ["adminVendors", "main"],
      minChunks : 2
     }),
    new webpack.optimize.CommonsChunkPlugin({
      name : "commons",
      chunks: ["vendors", "main"],
      minChunks : 2
     }),
    /* THE CONFIG BELOW (admin-commons, admin-commons-create, admin-commins-index, 'vendors'/'manifest') ALMOST works, but still imports quill into main */
    // new webpack.optimize.CommonsChunkPlugin({
    //   name : "admin-commons",
    //   chunks: ["createblog", "modal", "createphotogallery", "galleryindex", "blogsindex"],
    //   minChunks: 2
    //  }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "admin-commons-create",
    //   chunks: ["createblog", "modal", "createphotogallery", "admin-commons"],
    //   minChunks: 2
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "admin-commons-index",
    //   chunks: ["galleryindex", "blogsindex", "admin-commons"],
    //   minChunks: 2
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names : ['vendors', 'manifest'],
    //   minChunks: Infinity
    //  }),
    // =========== // below makes no difference if added to above four
    // new webpack.optimize.CommonsChunkPlugin({
    //   children: true,
    //   minChunks: 2
    // }),
    // //=========== // below also does nothing
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: "commonlazy.js",
    //   children: true
    // }),
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
