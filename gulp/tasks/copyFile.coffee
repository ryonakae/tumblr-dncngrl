gulp = require 'gulp'
config = require '../config'
browserSync = require 'browser-sync'


# copy files
gulp.task 'copyFile', ->
  gulp.src(
    [
      config.source.root + 'index.html'
      # config.source.fonts + '**/*'
    ]
    base: config.source.root
  )
  .pipe gulp.dest config.build.root
  .pipe browserSync.stream()