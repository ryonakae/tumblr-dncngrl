gulp = require 'gulp'
runSequence  = require 'run-sequence'


# Build Task
gulp.task 'build', ->
  runSequence 'clearCache', 'cleanBuild', ['copyFile', 'svgSprite'], ['jade', 'stylus:production'], 'browserify', 'include:production', 'prettifyHtml'