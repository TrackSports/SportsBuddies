var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var saveHashes = require('assets-webpack-plugin');
var commonConfig = require('./webpack.common');
var helpers = require('./helpers');

module.exports = webpackMerge.smart(commonConfig, {
  output: {
    publicPath: '/',
    path: helpers.root('server', 'InfoTrack.Flexit.Web', 'wwwroot', 'dist'),
    filename: '[name]-[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[hash:base64:5]!stylus'
        )
      }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    // alias: {
    //   react: 'react/dist/react.min.js',
    //   'react-dom': 'react-dom/dist/react-dom.min.js',
    //   redux: 'redux/dist/redux.min.js',
    //   immutable: 'immutable/dist/immutable.min.js'
    // }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor-[hash].js"),
    new ExtractTextPlugin('app-[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({ sourceMap: false, output: { comments: false } }),
    new saveHashes({ path: helpers.root('server', 'InfoTrack.Flexit.Web', 'wwwroot', 'dist') })
  ]
});
