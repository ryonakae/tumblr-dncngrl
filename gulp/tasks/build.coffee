gulp = require 'gulp'
runSequence  = require 'run-sequence'


# Build Task
gulp.task 'build', ->
  runSequence 'clearCache', 'cleanBuild', 'imageSprite', 'imageMin', ['jade', 'bower'], 'inline'