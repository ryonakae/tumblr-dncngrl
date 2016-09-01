import gulp from 'gulp';
import path from '../path';
import browserSync from 'browser-sync';
const bs = browserSync.create();
export default bs;


// browserSync
gulp.task('bs:init', () => {
  return bs.init({
    open: false,
    notify: false,
    reloadDelay: 300,
    server: {
      baseDir: path.build.root,
      // logLevel: 'debug',
      // logConnections: true
    }
  });
});


gulp.task('bs:reload', () => {
  return bs.reload();
});