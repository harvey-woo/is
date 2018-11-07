const resolve = require('path').resolve

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.ts', '.jsx', '.tsx' ]
  },
  output: {
    filename: 'index.js',
    path: resolve('dist')
  }
}