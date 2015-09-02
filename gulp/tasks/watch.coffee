gulp = require 'gulp'
config = require '../config'
runSequence  = require 'run-sequence'


# Default Task
gulp.task 'watch', ->
  runSequence 'cleanBuild', 'imageSprite', 'imageMin', ['jade', 'webpack']

  gulp.watch config.source.root + '**/*.jade', ['jade']
  gulp.watch config.source.stylesheets + '**/*.styl', ['webpack']
  gulp.watch config.source.javascripts + '**/*.jsx', ['webpack']
  gulp.watch config.source.iamges + '*', ['imageMin']