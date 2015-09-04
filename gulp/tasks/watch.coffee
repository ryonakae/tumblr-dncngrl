gulp = require 'gulp'
config = require '../config'
runSequence  = require 'run-sequence'


# Default Task
gulp.task 'watch', ->
  runSequence 'cleanBuild', 'imageSprite', ['imageMin', 'bower'], ['jade', 'stylus', 'watchify', 'copyFile'], 'browserSync'

  gulp.watch config.source.root + '**/*.jade', ['jade']
  gulp.watch config.source.stylesheets + '**/*.styl', ['stylus']
  gulp.watch config.source.javascripts + '**/*.jsx', ['watchify']
  gulp.watch config.source.iamges + '*', ['imageMin']