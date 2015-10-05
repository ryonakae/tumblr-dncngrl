gulp = require 'gulp'
config = require '../config'
spritesmith = require 'gulp.spritesmith'
imagemin = require 'gulp-imagemin'
pngcrush = require 'imagemin-pngcrush'
cache = require 'gulp-cache'


# image sprite
gulp.task 'imageSprite', ->
  spriteData = gulp.src config.source.sprite + '*.png'
  .pipe spritesmith
    imgName: 'sprite.png'
    imgPath: '../images/sprite.png'
    cssName: '_sprite.styl'
    padding: 10
    retinaSrcFilter: config.source.sprite + '*-2x.png'
    retinaImgName: 'sprite-2x.png'
    retinaImgPath: '../images/sprite-2x.png'

  spriteData.img
    .pipe cache imagemin
      optimizationLevel: 4
      progressive: true
      interlaced: true
      svgoPlugins: [{removeViewBox: false}]
    .pipe gulp.dest config.source.images

  spriteData.css
    .pipe gulp.dest config.source.stylesheets