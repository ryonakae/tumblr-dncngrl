gulp = require 'gulp'
runSequence  = require 'run-sequence'


# Build Task
gulp.task 'build', ->
  runSequence 'clearCache', 'cleanBuild', ['copyFile', 'imageMin'], ['jade', 'stylus'], 'browserify', 'inline'