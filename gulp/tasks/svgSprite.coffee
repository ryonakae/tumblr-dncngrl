gulp = require 'gulp'
config = require '../config'
svgSprites = require 'gulp-svg-sprites'
imagemin = require 'gulp-imagemin'
pngcrush = require 'imagemin-pngcrush'


gulp.task 'svgSprite', ->
  gulp
    .src config.source.sprite + '*.svg'
    .pipe svgSprites
      mode: 'symbols'
      preview: false
    .pipe gulp.dest config.build.images