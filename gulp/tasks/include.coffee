gulp   = require 'gulp'
path = require '../path'
include = require 'gulp-file-include'

# development
gulp.task 'include:development', ->
  gulp
    .src path.build.root + 'index.html'
    .pipe include
      prefix: '@@'
      basePath: '@file'
      context:
        env: 'development'
    .pipe gulp.dest 'build/'

# production
gulp.task 'include:production', ->
  gulp
    .src path.build.root + 'index.html'
    .pipe include
      prefix: '@@'
      basePath: '@file'
      context:
        env: 'production'
    .pipe gulp.dest 'build/'