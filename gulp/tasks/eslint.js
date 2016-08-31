import gulp from 'gulp';
import path from '../path';
import env from '../env';
import plumber from 'gulp-plumber';
import esLint from 'gulp-eslint';
import gutil from 'gulp-util';


// copy files
gulp.task('esLint', () => {
  // returnはつけない(watchifyでうまく動かない)
  gulp
    .src([
      path.source.javascripts + '**/*.{js,jsx,vue}',
      '!' + path.source.javascripts + 'lib/**/*'
    ])
    .pipe(plumber())
    .pipe(esLint({
      useEslintrc: true
    }))
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
    .pipe(esLint.results((results)=>{
      if (results.errorCount === 0) {
        gutil.log('ESLint: ' + gutil.colors.green('There is no js error.'));
      }
    }));
});