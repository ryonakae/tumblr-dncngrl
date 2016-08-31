import gulp from 'gulp';
import path from '../path';
import env from '../env';
import include from 'gulp-file-include';
import prettifyHtml from 'gulp-prettify';


gulp.task('include', () => {
  let env = 'development';

  if (env.isProduction) {
    env = 'production';
  }

  return gulp
    .src(path.source.root + 'index.html')
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
    .pipe(gulp.dest('build/'));
});