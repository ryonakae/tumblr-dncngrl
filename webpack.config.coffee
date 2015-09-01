webpack = require 'webpack'
BowerWebpackPlugin = require 'bower-webpack-plugin'
path = require 'path'
koutoSwiss = require('kouto-swiss').includePaths

module.exports =
  # entry: ''

  output:
    filename: 'bundle.js'

  resolve:
    root: [path.join(__dirname, 'bower_components')]
    moduleDirectories: ['bower_components', 'node_modules']
    extensions: ['', '.js', '.jsx', '.coffee']

  module:
    loaders: [
      {
        test: /\.coffee$/
        loader: 'coffee-loader'
      }
      {
        test: /\.jsx$/
        loader: 'jsx-loader?harmony'
      }
      {
        test: /\.styl$/
        loader: 'style-loader!css-loader!stylus-loader!autoprefixer-loader?{browsers:["last 2 version"]}'
      }
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