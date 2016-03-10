var path = require('path');
var webpack = require('webpack');
var entries = require('./webpack.config.test').entry;

for(var key in entries) {
    var arr = [];
    arr.unshift('eventsource-polyfill','webpack-hot-middleware/client',entries[key]);
    entries[key] = arr;
}
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
    { test: /\.css$/, loader: 'style-loader!css-loader' }]
  }
};
