gulp = require 'gulp'
config = require '../config'
webpack = require 'gulp-webpack'
plumber = require 'gulp-plumber'
uglify = require 'gulp-uglify'
saveLicense = require 'uglify-save-license'


# webpack
gulp.task 'webpack', ->
  gulp
    .src config.source.javascripts + 'main.jsx'
    .pipe plumber()
    .pipe webpack require '../../webpack.config.coffee'
    .pipe uglify
      preserveComments: saveLicense
    .pipe gulp.dest config.build.javascripts