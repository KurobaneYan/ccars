const path = require('path')

const config = {
  context: path.resolve(__dirname, 'public/'),
  entry: {
    index: './js/index',
    index2: './js/index2'
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js'
  }
}

module.exports = config
