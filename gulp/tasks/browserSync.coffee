gulp = require 'gulp'
config = require '../config'
browserSync = require 'browser-sync'


# browserSync
gulp.task 'browserSync', ->
  browserSync.init
    open: false
    notify: false
    server:
      baseDir: config.build.root