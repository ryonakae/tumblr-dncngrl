gulp = require 'gulp'
path = require '../path'
env = require '../env'
browserify = require 'browserify'
vueify = require 'vueify'
babelify = require 'babelify'
watchify = require 'watchify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
uglify = require 'gulp-uglify'
sourcemaps = require 'gulp-sourcemaps'
gutil = require 'gulp-util'
gulpif = require 'gulp-if'
prettyHrtime = require 'pretty-hrtime'
eslint = require 'gulp-eslint'
plumber = require 'gulp-plumber'


# path
# パスの先頭に ./ をつけないとエラー出る
srcPath = './' + path.source.javascripts + 'main.js'
destPath = './' + path.build.javascripts


# browserify task
gulp.task 'browserify', ->
  compile env.isProduction


# compile function
compile = (isProduction) ->
  option =
    transform: [vueify, [babelify, {'presets': 'es2015'}]]
    debug: true
    extensions: ['.js']
  bundler = null
  bundleJs = 'bundle.js'
  bundleLogger = new BundleLogger srcPath, bundleJs

  # production(browserify)
  if(isProduction == true)
    bundler = browserify srcPath, option

  # development(watchify)
  else
    option.cache = {}
    option.packageCache = {}
    option.fullPaths = true
    bundler = watchify browserify srcPath, option
    bundleLogger.watch()

  bundle = ->
    # ESLint
    bundleLogger.beginLint()
    gulp
      .src './' + path.source.javascripts + '**/*.js'
      .pipe plumber()
      .pipe eslint
        useEslintrc: true
      .pipe eslint.format()
      .pipe eslint.failOnError()
      .pipe eslint.result (result) ->
        bundleLogger.endLint()

    # Browserify
    bundleLogger.begin()
    bundler
      .bundle()
      .on 'error', (err)->
        gutil.log 'Browserify Error: \n' + gutil.colors.red(err.message)
      .pipe source bundleJs
      .pipe buffer()
      .pipe gulpif isProduction == false, sourcemaps.init
        loadMaps: true
      .pipe gulpif isProduction == false, sourcemaps.write './'
      .pipe gulpif isProduction == true, uglify
        preserveComments: 'some'
      .on 'end', bundleLogger.end
      .pipe gulp.dest destPath

  bundler.on 'update', bundle

  bundle()


# logger function
class BundleLogger
  constructor: (src, bundle) ->
    @beginTime = null

    @beginLint = =>
      @beginTime = process.hrtime()
      gutil.log 'Starting', gutil.colors.magenta('ESLint')

    @begin = =>
      @beginTime = process.hrtime()
      gutil.log 'Bundling', gutil.colors.green(src) + '...'

    @watch = ->
      gutil.log 'Watching files required by', gutil.colors.yellow(src)

    @end = =>
      taskTime = process.hrtime @beginTime
      prettyTime = prettyHrtime taskTime
      gutil.log 'Bundled', gutil.colors.green(bundle), 'in', gutil.colors.magenta(prettyTime)

    @endLint = =>
      taskTime = process.hrtime @beginTime
      prettyTime = prettyHrtime taskTime
      gutil.log 'Finished', gutil.colors.magenta('ESLint'), 'in', gutil.colors.magenta(prettyTime)