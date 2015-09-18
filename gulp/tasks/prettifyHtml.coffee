gulp   = require 'gulp'
config = require '../config'
prettifyHtml = require 'gulp-prettify'

gulp.task 'prettifyHtml', ->
  gulp
    .src config.build.root + 'index.html'
    .pipe prettifyHtml
      indent_size: 0
    .pipe gulp.dest 'build/'