import gulp from 'gulp';
import path from '../path';
import env from '../env';
import stylus from 'gulp-stylus';
import autoprefixer from 'autoprefixer-stylus';
import koutoSwiss from 'kouto-swiss';
import combineMediaQueries from 'gulp-combine-media-queries';
import csscomb from 'gulp-csscomb';
import minifyCss from 'gulp-minify-css';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import lazypipe from 'lazypipe';
import bs from './browserSync';
import replace from 'gulp-replace';
import base64 from 'gulp-base64';


// stylus
gulp.task('stylus', () => {
  // lazypipe().pipe(fn[, arg1[, arg2[, ...]]])
  // e.g.: lazypipe().pipe(concat, 'bundle.js', {newLine: ';'});
  const prodTasks = lazypipe()
    .pipe(combineMediaQueries)
    .pipe(csscomb)
    .pipe(minifyCss);

  return gulp
    .src([
      path.source.stylesheets + '**/*.styl',
      '!' + path.source.stylesheets + '**/_*.styl'
    ])
    .pipe(plumber())
    .pipe(gulpif(!env.isProduction, sourcemaps.init()))
    .pipe(stylus({
      use: [
        koutoSwiss(),
        autoprefixer({ browsers: ['last 2 versions'] })
      ],
      set: { 'include css': true }
    }))
    .pipe(gulpif(!env.isProduction, sourcemaps.write('./')))
    .pipe(gulpif(env.isProduction, base64({
      extensions: ['woff', 'ttf', 'svg'],
      maxImageSize: 2000*1024, //20MB
      debug: true
    })))
    .pipe(gulpif(env.isProduction, replace('../', 'http://file.brdr.jp/dncngrl/')))
    .pipe(gulpif(env.isProduction, prodTasks()))
    .pipe(gulp.dest(path.build.stylesheets))
    .pipe(bs.stream({match: '**/*.css'}));
    // .on('end', () => {
    //   if(!env.isProduction && bs.active) gulp.start('bs:reload');
    // });
});