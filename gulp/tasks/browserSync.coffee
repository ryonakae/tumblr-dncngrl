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

  gulp.watch config.source.root + '**/*.html', ['copyFile']
  gulp.watch config.source.stylesheets + '**/*.styl', ['stylus']
  gulp.watch config.source.javascripts + '**/*.jsx', ['webpack']
  gulp.watch config.source.iamges + '*', ['imageMin']