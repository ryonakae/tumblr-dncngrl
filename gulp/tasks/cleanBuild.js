import gulp from 'gulp';
import path from '../path';
import rimraf from 'rimraf';


// clean build directory
gulp.task('cleanBuild', (cb) => {
  return rimraf(path.build.root, cb);
});