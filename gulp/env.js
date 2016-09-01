import minimist from 'minimist';
import gutil from 'gulp-util';

let isProduction = false;

const minimistOption = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'
  }
};

const options = minimist(process.argv.slice(2), minimistOption);

if(options.env === 'production'){
  isProduction = true;
}

gutil.log('[env]', gutil.colors.yellow(options.env), '[isProduction]', gutil.colors.yellow(isProduction));

export default {
  isProduction: isProduction
}