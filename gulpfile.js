const gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),

  source = 'process/css/',
  dest = 'public/';

gulp.task('css', function() {
  gulp.src(source + 'style.css')
  .pipe(postcss([
    cssnano({discardComments: { removeAll: true}}),
    autoprefixer()
  ]))
  .on('error', gutil.log)
  .pipe(gulp.dest(dest + 'css'));
});

gulp.task('watch', function() {
  gulp.watch(source + '**/*.css', ['css']);
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['css', 'webserver','watch']);
