gulp = require 'gulp'
config = require '../config'
runSequence  = require 'run-sequence'


gulp.task 'watch', ->
  runSequence 'cleanBuild', ['copyFile', 'imageMin'], ['jade', 'stylus', 'watchify'], 'browserSync'

  gulp.watch config.source.root + '**/*.jade', ['jade']
  gulp.watch config.source.stylesheets + '**/*.styl', ['stylus']
  gulp.watch config.source.sprite + '*.svg', ['svgSprite']


gulp.task 'default', ['watch']