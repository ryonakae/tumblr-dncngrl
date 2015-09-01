webpack = require 'webpack'
BowerWebpackPlugin = require 'bower-webpack-plugin'
path = require 'path'

module.exports =
  # entry: ''

  output:
    filename: 'bundle.js'

  resolve:
    root: [path.join(__dirname, 'bower_components')]
    moduleDirectories: ['bower_components']
    extensions: ['', '.js', '.jsx', '.coffee']

  module:
    loaders: [
      { test: /\.coffee$/, loader: 'coffee' },
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]

  plugins: [
    new BowerWebpackPlugin()
    # jQueryをグローバルに出す
    # requireしなくてもjQueryが使える
    new webpack.ProvidePlugin
      jQuery: "jquery"
      $: "jquery"
      jquery: "jquery"
  ]

  devtool: 'inline-source-map'