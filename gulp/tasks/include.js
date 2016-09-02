import gulp from 'gulp';
import path from '../path';
import env from '../env';
import include from 'gulp-file-include';
import prettifyHtml from 'gulp-prettify';


gulp.task('include', () => {
  let environment;

  if (env.isProduction) {
    environment = 'production';
  }
  else {
    environment = 'development';
  }

  return gulp
    .src(path.source.root + 'index.html')
    .pipe(include({
      prefix: '@@',
      basePath: '@file',
      context: {
        env: environment
      }
    }))
    .pipe(prettifyHtml({
      indent_size: 0
    }))
    .pipe(gulp.dest('build/'));
});