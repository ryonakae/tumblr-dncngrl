gulp = require 'gulp'
path = require '../path'
env = require '../env'
stylus = require 'gulp-stylus'
plumber = require 'gulp-plumber'
sourcemaps = require 'gulp-sourcemaps'
autoprefixer = require 'autoprefixer-stylus'
koutoSwiss = require 'kouto-swiss'
combineMediaQueries = require 'gulp-combine-media-queries'
csscomb = require 'gulp-csscomb'
minifyCss = require 'gulp-minify-css'
gulpif = require 'gulp-if'


gulp.task 'stylus', ->
  gulp
    .src [
      path.source.stylesheets + '**/*.styl'
      '!' + path.source.stylesheets + '**/_*.styl'
    ]
    .pipe plumber()
    .pipe gulpif env.isProduction == false, sourcemaps.init()
    .pipe stylus
      use: [
        koutoSwiss()
        autoprefixer
          browsers: ['last 2 versions']
      ]
      set:
        "include css": true
    .pipe gulpif env.isProduction == false, sourcemaps.write './'
    .pipe gulpif env.isProduction == true, combineMediaQueries()
    .pipe gulpif env.isProduction == true, csscomb()
    .pipe gulpif env.isProduction == true, minifyCss()
    .pipe gulp.dest path.build.stylesheets