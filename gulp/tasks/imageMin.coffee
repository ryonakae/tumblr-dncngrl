gulp = require 'gulp'
config = require '../config'
imagemin = require 'gulp-imagemin'
pngcrush = require 'imagemin-pngcrush'
changed = require 'gulp-changed'
browserSync = require 'browser-sync'


# ImageMin
gulp.task 'imageMin', ->
  gulp
    .src [
      config.source.images + '**/*'
      '!' + config.source.images + 'sprite/*'
    ]
    .pipe changed config.build.images
    .pipe imagemin
      optimizationLevel: 7
      progressive: true
      interlaced: true
      svgoPlugins: [{removeViewBox: false}]
      use: [pngcrush()]
    .pipe gulp.dest config.build.images
    .pipe browserSync.stream()