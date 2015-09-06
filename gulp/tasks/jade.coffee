gulp = require 'gulp'
config = require '../config'
jade = require 'gulp-jade'
plumber = require 'gulp-plumber'
browserSync = require 'browser-sync'
inline = require 'gulp-inline-source'


gulp.task 'jade', ->
  gulp
    .src [
      config.source.root + 'index.jade'
      '!' + config.source.root + '**/_*.jade'
    ]
    .pipe plumber()
    .pipe jade
      pretty: true
    .pipe gulp.dest config.build.root
    .pipe browserSync.stream()