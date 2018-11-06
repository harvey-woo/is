const resolve = require('path').resolve
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')

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
  },
  plugins: [
    new TypedocWebpackPlugin({
      mode: 'modules',
      exclude: '**/__test__/**/*.*',
      out: resolve('docs')
    }, './src')
  ]
}