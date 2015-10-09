gulp = require 'gulp'
config = require '../config'
stylus = require 'gulp-stylus'
plumber = require 'gulp-plumber'
sourcemaps = require 'gulp-sourcemaps'
minifyCss = require 'gulp-minify-css'
autoprefixer = require 'autoprefixer-stylus'
koutoSwiss = require 'kouto-swiss'
base64 = require 'gulp-base64'
combineMediaQueries = require 'gulp-combine-media-queries'
csscomb = require 'gulp-csscomb'


gulp.task 'stylus:development', ->
  gulp
    .src [
      config.source.stylesheets + '**/*.styl'
      '!' + config.source.stylesheets + '**/_*.styl'
    ]
    .pipe plumber()
    .pipe sourcemaps.init
      loadMaps: true
    .pipe stylus
      use: [
        koutoSwiss()
        autoprefixer
          browsers: ['last 2 versions']
      ]
      set:
        "include css": true
    .pipe sourcemaps.write './'
    .pipe gulp.dest config.build.stylesheets


gulp.task 'stylus:production', ->
  gulp
    .src [
      config.source.stylesheets + '**/*.styl'
      '!' + config.source.stylesheets + '**/_*.styl'
    ]
    .pipe plumber()
    .pipe stylus
      use: [
        koutoSwiss()
        autoprefixer
          browsers: ['last 2 versions']
      ]
      set:
        "include css": true
    .pipe base64
      extensions: ['jpg', 'png', 'woff', 'ttf', 'svg']
      maxImageSize: 2000*1024 # 20MB
      debug: true
    .pipe combineMediaQueries()
    .pipe csscomb()
    .pipe minifyCss
      keepSpecialComments: 0
    .pipe gulp.dest config.build.stylesheets