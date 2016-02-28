gulp = require 'gulp'
path = require '../path'
env = require '../env'
runSequence  = require 'run-sequence'
browserSync = require 'browser-sync'


gulp.task 'default', ->
  # production
  if(env.isProduction == true)
    runSequence 'clearCache', 'cleanBuild', ['copyFile', 'imageSprite'], ['jade', 'stylus', 'browserify', 'imageMin'], 'include:production'

  # development
  else
    runSequence 'cleanBuild', ['copyFile', 'imageSprite'], ['jade', 'stylus', 'browserify', 'imageMin'], 'include:development', 'browserSync', 'watch'