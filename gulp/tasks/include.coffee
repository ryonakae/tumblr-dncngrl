gulp   = require 'gulp'
config = require '../config'
include = require 'gulp-file-include'

# development
gulp.task 'include:development', ->
  gulp
    .src config.build.root + 'index.html'
    .pipe include
      prefix: '@@'
      basePath: '@file'
      context:
        env: 'development'
    .pipe gulp.dest 'build/'

# production
gulp.task 'include:production', ->
  gulp
    .src config.build.root + 'index.html'
    .pipe include
      prefix: '@@'
      basePath: '@file'
      context:
        env: 'production'
    .pipe gulp.dest 'build/'