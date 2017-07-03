var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common');
var helpers = require('./helpers');

module.exports = webpackMerge.smart(commonConfig, {
  output: {
    publicPath: '/',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: helpers.root('client'),
        loaders: [
          // 'react-hot',
          'babel-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    new ExtractTextPlugin('app.css')
  ],

  devServer: {
    contentBase: helpers.root('client'),
    hot: true,
    proxy: {
      // '*': {
      //   target: 'http://localhost:5000',
      //   secure: false,
      //   rewrite: function(req) {
      //     console.log(req.url);debugger
      //     req.url = req.url.replace(/^\/flexit/, '');
      //     console.log(req.url);
      //   }
      // }
      '/flexit/api/*': 'http://localhost:5000',
      '/flexit/content/*': 'http://localhost:5000',
      '/flexit/images/*': 'http://localhost:5000'
      // '/realtime/*': 'http://localhost:5000',
      // '/signalr/*': 'http://localhost:5000'
    }
  }
});
