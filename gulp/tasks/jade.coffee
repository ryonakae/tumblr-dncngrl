gulp = require 'gulp'
path = require '../path'
env = require '../env'
jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
gulpif = require 'gulp-if'


gulp.task 'jade', ->
  gulp
    .src [
      path.source.root + '*.jade'
      '!' + path.source.root + '**/_*.jade'
    ]
    .pipe plumber()
    .pipe jade
      pretty: true
    .pipe gulp.dest path.build.root