gulp = require 'gulp'
config = require '../config'
watchify = require 'gulp-watchify'
plumber = require 'gulp-plumber'
rename = require 'gulp-rename'
reactify = require 'reactify'
browserSync = require 'browser-sync'


gulp.task 'watchify', ['bower'], watchify (watchify)->
  gulp.src config.source.javascripts + 'main.jsx'
    .pipe plumber()
    .pipe watchify
      watch: on
      transform: [reactify]
      extensions: ['.coffee', '.js', '.jsx']
    .pipe rename 'bundle.js'
    .pipe gulp.dest config.build.javascripts
    .pipe browserSync.stream()