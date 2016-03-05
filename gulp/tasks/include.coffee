gulp   = require 'gulp'
path = require '../path'
include = require 'gulp-file-include'
prettifyHtml = require 'gulp-prettify'

# development
gulp.task 'include:development', ->
  gulp
    .src path.source.root + 'index.html'
    .pipe include
      prefix: '@@'
      basePath: '@file'
      context:
        env: 'development'
    .pipe prettifyHtml
      indent_size: 0
    .pipe gulp.dest 'build/'

# production
gulp.task 'include:production', ->
  gulp
    .src path.source.root + 'index.html'
    .pipe include
      prefix: '@@'
      basePath: '@file'
      context:
        env: 'production'
    .pipe prettifyHtml
      indent_size: 0
    .pipe gulp.dest 'build/'