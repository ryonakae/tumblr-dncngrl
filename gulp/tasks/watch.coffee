gulp = require 'gulp'
config = require '../config'
runSequence  = require 'run-sequence'


gulp.task 'watch', ->
  runSequence 'cleanBuild', ['jade', 'stylus', 'watchify', 'copyFile', 'svgSprite'], 'include','browserSync'

  gulp.watch config.source.root + '**/*.jade', ->
    runSequence 'jade', 'include'
  gulp.watch config.source.stylesheets + '**/*.styl', ['stylus']
  gulp.watch config.source.sprite + '*.svg', ['svgSprite']


gulp.task 'default', ['watch']