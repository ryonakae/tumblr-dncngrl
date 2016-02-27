gulp = require 'gulp'
path = require '../path'


# copy files
gulp.task 'copyFile', ->
  gulp.src(
    [
      path.source.fonts + '**/*'
      path.source.templateTag + '**/*.html'
    ]
    base: path.source.root
  )
  .pipe gulp.dest path.build.root