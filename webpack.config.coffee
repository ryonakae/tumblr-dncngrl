webpack = require 'webpack'
BowerWebpackPlugin = require 'bower-webpack-plugin'
BrowserSyncPlugin = require('browser-sync-webpack-plugin')
path = require 'path'

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
      {
        test: /\.(png|woff)$/
        loader: 'url-loader'
      }
    ]

  plugins: [
    # Bower
    new BowerWebpackPlugin()

    # jQueryをグローバルに出す
    # requireしなくてもjQueryが使える
    new webpack.ProvidePlugin
      jQuery: "jquery"
      $: "jquery"
      jquery: "jquery"

    # BrowserSync
    new BrowserSyncPlugin
      open: false
      notify: true
      host: 'localhost'
      port: 3000
      server:
        baseDir: 'build/'
  ]

  devtool: 'inline-source-map'

  watch: true