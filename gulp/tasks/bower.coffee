gulp = require 'gulp'
config = require '../config'
mainBowerFiles = require 'main-bower-files'
filter = require 'gulp-filter'


gulp.task 'bower', ->
  jsFilter = filter('**/*.js')
  cssFilter = filter('**/*.css')

  gulp
    .src mainBowerFiles()
    .pipe jsFilter
    .pipe gulp.dest config.build.jslibs