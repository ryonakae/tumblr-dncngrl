gulp = require 'gulp'
config = require '../config'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
reactify = require 'reactify'


gulp.task 'browserify', ->
  browserify
    entries: [config.source.javascripts + 'main.jsx']
    transform: [reactify]
    extensions: ['.coffee', '.js', '.jsx']
  .bundle()
  .pipe source 'bundle.js'
  .pipe gulp.dest config.build.javascripts