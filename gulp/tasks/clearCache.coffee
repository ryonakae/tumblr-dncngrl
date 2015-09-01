gulp = require 'gulp'
cache = require 'gulp-cache'

# clear cache
gulp.task 'clearCache', (done) ->
  cache.clearAll done