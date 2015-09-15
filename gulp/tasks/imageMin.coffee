gulp = require 'gulp'
config = require '../config'
imagemin = require 'gulp-imagemin'
pngcrush = require 'imagemin-pngcrush'
cache = require 'gulp-cache'
browserSync = require 'browser-sync'


# ImageMin
gulp.task 'imageMin', ->
  gulp
    .src [
      config.source.images + '**/*'
      '!' + config.source.images + 'sprite/*'
    ]
    .pipe cache imagemin
      optimizationLevel: 7
      progressive: true
      interlaced: true
      svgoPlugins: [{removeViewBox: false}]
      use: [pngcrush()]
    .pipe gulp.dest config.build.images
    # .pipe browserSync.stream()