gulp = require 'gulp'
config = require '../config'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
reactify = require 'reactify'
uglify = require 'gulp-uglify'
saveLicense = require 'uglify-save-license'
buffer = require 'vinyl-buffer'
streamify = require 'gulp-streamify'
gutil = require 'gulp-util'


# ファイルパスを ./ で始めないとエラーが出る…
gulp.task 'browserify', ['bower'], ->
  browserify
    entries: ['./' + config.source.javascripts + 'main.jsx']
    transform: [reactify]
    extensions: ['.coffee', '.js', '.jsx']
  .bundle()
  .pipe source 'bundle.js'
  .pipe buffer()
  .pipe uglify().on 'error', gutil.log
  .pipe gulp.dest './' + config.build.javascripts