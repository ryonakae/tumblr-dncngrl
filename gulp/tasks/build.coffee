gulp = require 'gulp'
runSequence  = require 'run-sequence'


# Build Task
gulp.task 'build', ->
  runSequence 'clearCache', 'cleanBuild', ['copyFile', 'svgSprite'], ['jade', 'stylus'], 'browserify', 'include', 'inline'