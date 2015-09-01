gulp = require 'gulp'
config = require '../config'
rimraf = require 'rimraf'


# clean build directory
gulp.task 'cleanBuild', (cb) ->
  rimraf config.build.root, cb