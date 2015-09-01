gulp   = require 'gulp'
config = require '../config'
inline = require 'gulp-inline-source'

gulp.task 'inline', ->
  gulp
    .src config.build.root + 'index.html'
    .pipe inline
      compress: false
      inlineJS: true
      pretty: true
    .pipe gulp.dest 'build/'