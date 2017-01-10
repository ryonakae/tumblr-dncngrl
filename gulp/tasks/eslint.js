import gulp from 'gulp';
import path from '../path';
import env from '../env';
import plumber from 'gulp-plumber';
import esLint from 'gulp-eslint';


// esLint
gulp.task('esLint', () => {
  return gulp
    .src([
      path.source.javascripts + '**/*.{js,jsx,vue}',
      '!' + path.source.javascripts + 'lib/**/*'
    ])
    .pipe(plumber({
      errorHandler(err) {
        this.emit('end');
      }
    }))
    .pipe(esLint({
      useEslintrc: true
    }))
    .pipe(esLint.format())
    .pipe(esLint.failAfterError());
});