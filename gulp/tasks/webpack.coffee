gulp = require 'gulp'
config = require '../config'
# webpack = require 'gulp-webpack'
webpack = require 'webpack-stream'
plumber = require 'gulp-plumber'
uglify = require 'gulp-uglify'
saveLicense = require 'uglify-save-license'
browserSync = require 'browser-sync'


# webpack dev
gulp.task 'webpackDev', ->
  gulp
    .src config.source.javascripts + 'main.jsx'
    .pipe plumber()
    .pipe webpack require '../../webpack.config.coffee'
    .pipe gulp.dest config.build.javascripts
    .pipe browserSync.stream()


# webpack build
gulp.task 'webpackBuild', ->
  gulp
    .src config.source.javascripts + 'main.jsx'
    .pipe webpack require '../../webpack.config.coffee'
    .pipe uglify
      preserveComments: saveLicense
    .pipe gulp.dest config.build.javascripts