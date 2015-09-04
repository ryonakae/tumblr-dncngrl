gulp = require 'gulp'
config = require '../config'
browserify = require 'browserify'
babelify = require 'babelify'
watchify = require 'watchify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
merge = require 'utils-merge'
rename = require 'gulp-rename'
uglify = require 'gulp-uglify'
sourcemaps = require 'gulp-sourcemaps'
gutil = require 'gulp-util'


srcPath = config.source.javascripts + 'main.jsx'
destPath = config.build.javascripts


gulp.task 'watchify', ['bower'], ->
  watchifyConfig = merge watchify.args,
    entries: [srcPath]
    transform: [babelify]
    debug: true
    extensions: ['.coffee', '.js', '.jsx']

  bundler = watchify browserify(watchifyConfig)

  compile(bundler)

  bundler.on 'update', ->
    compile(bundler)
  bundler.on 'log', (msg)->
    gutil.log 'Finished', '\'' + gutil.colors.cyan('watchify') + '\'', msg


compile = (bundler) ->
  bundler.bundle()
    .on 'error', (err)->
      gutil.log 'Browserify Error:', err
    .pipe source 'bundle.js'
    .pipe buffer()
    .pipe gulp.dest destPath
    # .pipe rename 'bundle.min.js'
    # .pipe sourcemaps.init
    #   loadMaps: true
    # .pipe uglify()
    # .pipe sourcemaps.write './'
    # .pipe gulp.dest config.build.javascripts


gulp.task 'browserify', ['bower'], ->
  bundler = browserify srcPath,
    entries: [srcPath]
    transform: [babelify]
    debug: true
    extensions: ['.coffee', '.js', '.jsx']

  compile(bundler)