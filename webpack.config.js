const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public')
}

const config = {
  context: PATHS.source,
  entry: {
    index: './js/index.js'
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['babili']
        }
      }
    ],
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.source + '/index.pug'
    })
  ],
  devtool: 'source-map'
}

module.exports = config
