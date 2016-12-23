module.exports = {
  entry: './client/src/ConnectFour.js',
  output: {
    filename: './client/dist/bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
