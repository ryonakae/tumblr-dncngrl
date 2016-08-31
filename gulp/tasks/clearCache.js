import gulp from 'gulp';
import cache from 'gulp-cache';

// clear cache
gulp.task('clearCache', (done) => {
  return cache.clearAll(done);
});