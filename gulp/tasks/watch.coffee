gulp = require 'gulp'
config = require '../config'
runSequence  = require 'run-sequence'


gulp.task 'watch', ->
  runSequence 'cleanBuild', ['copyFile', 'svgSprite'], ['jade', 'stylus', 'watchify'], 'include', 'browserSync'

  gulp.watch config.source.root + '**/*.jade', ->
    runSequence 'jade', 'include'
  gulp.watch config.source.stylesheets + '**/*.styl', ['stylus']
  gulp.watch config.source.images + '*.svg', ['copyFile']
  gulp.watch config.source.sprite + '*.svg', ->
    runSequence 'svgSprite', 'jade', 'include'


gulp.task 'default', ['watch']