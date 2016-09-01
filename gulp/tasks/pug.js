import gulp from 'gulp';
import path from '../path';
import env from '../env';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import bs from './browserSync';
import replace from 'gulp-replace';
import gulpif from 'gulp-if';
import include from 'gulp-file-include';
import prettifyHtml from 'gulp-prettify';


// pug
gulp.task('pug', () => {
  return gulp
    .src([
      path.source.root + '**/*.pug',
      '!' + path.source.root + '**/_*.pug'
    ])
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(include({
      prefix: '@@',
      basePath: '@file',
      context: {
        env: env
      }
    }))
    .pipe(prettifyHtml({
      indent_size: 0
    }))
    .pipe(gulp.dest(path.build.root))
    .on('end', () => {
      if(!env.isProduction && bs.active) gulp.start('bs:reload');
    });
});