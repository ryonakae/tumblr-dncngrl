gulp = require 'gulp'
config = require '../config'
browserSync = require 'browser-sync'


# copy files
gulp.task 'copyFile', ->
  gulp.src(
    [
      config.source.fonts + '**/*'
      config.source.images + '*.svg'
      config.source.templateTag + '**/*.html'
    ]
    base: config.source.root
  )
  .pipe gulp.dest config.build.root
  # .pipe browserSync.stream()