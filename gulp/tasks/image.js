import gulp from 'gulp';
import path from '../path';
import env from '../env';
import imagemin from 'gulp-imagemin';
import pngcrush from 'imagemin-pngcrush';
import cache from 'gulp-cache';
import spritesmith from 'gulp.spritesmith';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import bs from './browserSync';


// image minify
gulp.task('image:min', () => {
  const imageminOption = {
    optimizationLevel: 7,
    progressive: true,
    interlaced: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngcrush()]
  };

  return gulp
    .src([
      path.source.images + '**/*',
      path.build.images + 'sprite.png',
      '!' + path.source.images + 'sprite',
      '!' + path.source.sprite + '*'
    ])
    .pipe(gulpif(env.isProduction, imagemin(imageminOption)))
    .pipe(gulp.dest(path.build.images))
    .on('end', () => {
      if(!env.isProduction && bs.active) gulp.start('bs:reload');
    });
});


// image sprite
gulp.task('image:sprite', (callback) => {
  const spriteData = gulp.src(path.source.sprite + '*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: '_sprite.styl',
      padding: 10,
      retinaSrcFilter: path.source.sprite + '*-2x.png',
      retinaImgName: 'sprite-2x.png',
      retinaImgPath: '../images/sprite-2x.png'
    }));

  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest(path.build.images));

  const cssStream = spriteData.css
    .pipe(buffer())
    .pipe(gulp.dest(path.source.stylesheets));

  return merge(imgStream, cssStream);
});