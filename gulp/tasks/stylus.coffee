gulp = require 'gulp'
config = require '../config'
stylus = require 'gulp-stylus'
plumber = require 'gulp-plumber'
sourcemaps = require 'gulp-sourcemaps'
browserSync = require 'browser-sync'
minifyCss = require 'gulp-minify-css'
autoprefixer = require 'autoprefixer-stylus'
koutoSwiss = require 'kouto-swiss'


# stylus
gulp.task 'stylus', ->
  gulp
    .src [
      config.source.stylesheets + '**/*.styl'
      '!' + config.source.stylesheets + '**/_*.styl'
    ]
    .pipe sourcemaps.init()
    .pipe plumber()
    .pipe stylus
      use: [
        koutoSwiss()
        autoprefixer
          browsers: ['last 3 versions', 'ie 8', 'ie 9']
      ]
      set:
        "include css": true
    .pipe minifyCss
      keepSpecialComments: 0
    .pipe sourcemaps.write '.'
    .pipe gulp.dest config.build.stylesheets
    .pipe browserSync.stream()