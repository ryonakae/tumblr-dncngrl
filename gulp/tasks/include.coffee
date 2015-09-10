gulp   = require 'gulp'
config = require '../config'
include = require 'gulp-file-include'

gulp.task 'include', ->
  gulp
    .src config.build.root + 'index.html'
    .pipe include
      prefix: '@@'
      basePath: '@file'
    .pipe gulp.dest 'build/'