gulp = require 'gulp'
path = require '../path'
watch = require 'gulp-watch'
runSequence  = require 'run-sequence'


gulp.task 'watch', ->
  watch path.source.root + '**/*.jade', (event) ->
    gulp.start 'jade'

  watch path.source.stylesheets + '**/*.styl', (event) ->
    gulp.start 'stylus'

  watch path.source.fonts + '*', (event) ->
    gulp.start 'copyFile'

  watch path.source.sprite + '*', (event) ->
    runSequence 'imageSprite', 'stylus'