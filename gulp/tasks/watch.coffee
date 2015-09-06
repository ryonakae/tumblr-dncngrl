gulp = require 'gulp'
config = require '../config'
runSequence  = require 'run-sequence'


gulp.task 'watch', ->
  runSequence 'cleanBuild', 'imageSprite', 'imageMin', ['jade', 'stylus', 'watchify', 'copyFile'], 'browserSync'

  gulp.watch config.source.root + '**/*.jade', ['jade']
  gulp.watch config.source.stylesheets + '**/*.styl', ['stylus']
  gulp.watch config.source.iamges + '*', ['imageMin']
  gulp.watch config.source.sprite + '*', ['imageSprite']


gulp.task 'default', ['watch']