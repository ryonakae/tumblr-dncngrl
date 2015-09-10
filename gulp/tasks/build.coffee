gulp = require 'gulp'
runSequence  = require 'run-sequence'


# Build Task
gulp.task 'build', ->
  runSequence 'clearCache', 'cleanBuild', ['jade', 'stylus', 'copyFile', 'svgSprite'], 'browserify', 'inline', 'include'