gulp = require 'gulp'
config = require '../config'
browserify = require 'browserify'
babelify = require 'babelify'
watchify = require 'watchify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
merge = require 'utils-merge'
uglify = require 'gulp-uglify'
sourcemaps = require 'gulp-sourcemaps'
gutil = require 'gulp-util'


# path
# パスの先頭に ./ をつけないと何故かエラー出る
srcPath = './' + config.source.javascripts + 'main.jsx'
destPath = './' + config.build.javascripts


# watchify
gulp.task 'watchify', ['bower'], ->
  compile = ->
    option = merge watchify.args,
      entries: [srcPath]
      transform: [babelify]
      debug: true
      extensions: ['.coffee', '.js', '.jsx']
    bundler = watchify browserify(option)

    bundle = ->
      bundler
        .bundle()
        .on 'error', (err)->
          console.log gutil.log 'Browserify Error: \n' + err.message
        .pipe source 'bundle.js'
        .pipe buffer()
        .pipe sourcemaps.init
          loadMaps: true
        .pipe sourcemaps.write './'
        .pipe gulp.dest destPath

    bundle()

    bundler.on 'update', ->
      bundle()
    bundler.on 'log', (msg)->
      gutil.log 'Finished', '\'' + gutil.colors.cyan('watchify') + '\'', msg

  compile()


# browserify
gulp.task 'browserify', ['bower'], ->
  bundler = browserify
    entries: [srcPath]
    transform: [babelify]
    extensions: ['.coffee', '.js', '.jsx']
  .bundle()
  .on 'error', (err)->
    console.log gutil.log 'Browserify Error: \n' + err.message
  .pipe source 'bundle.js'
  .pipe buffer()
  .pipe uglify
    preserveComments: 'some'
  .pipe gulp.dest destPath