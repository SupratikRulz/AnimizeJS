const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('[name].bundle.css')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/core/animize.constructor.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './test_gui',
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
    port: 8080
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'animize.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    },
    {
      test: /\.scss$/,
      loader: extractCSS.extract(['css-loader','sass-loader'])
    }]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    extractCSS
  ]
}

module.exports = config