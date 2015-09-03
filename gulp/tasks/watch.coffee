gulp = require 'gulp'
config = require '../config'
runSequence  = require 'run-sequence'


# Default Task
gulp.task 'watch', ->
  runSequence 'cleanBuild', 'imageSprite', 'imageMin', ['jade', 'webpackDev', 'bower'], 'browserSync'

  gulp.watch config.source.root + '**/*.jade', ['jade']
  gulp.watch config.source.stylesheets + '**/*.styl', ['webpackDev']
  gulp.watch config.source.javascripts + '**/*.jsx', ['webpackDev']
  gulp.watch config.source.iamges + '*', ['imageMin']