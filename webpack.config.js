const path = require('path');
const webpack = require('webpack');
const flrtParser = './angular.fltr.parser.js';


module.exports = {
  entry: {
    'ng-fltr-parser': flrtParser,
    'ng-fltr-parser.min': flrtParser
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'angular/dist')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: './test',
    stats: 'minimal'
  }
};