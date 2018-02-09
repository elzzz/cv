const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const connect = require('gulp-connect');
const image = require('gulp-image');

gulp.task('sass', function () {
  return gulp.src('src/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(connect.reload())
    .pipe(gulp.dest('dest/css'));
});

gulp.task('pug', function() {
  return gulp.src('src/views/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest('dest'))
});

gulp.task('image', function () {
  gulp.src('src/images/*')
    .pipe(image())
    .pipe(gulp.dest('dest/img'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dest',
    livereload: true,
    fallback: 'dest/index.html',
    port: 8080
  });
});

gulp.task('build', ['sass', 'pug', 'image', 'connect'])

gulp.task('default', ['build'], function () {
  gulp.watch('src/stylesheets/*.scss', ['sass']);
  gulp.watch('src/stylesheets/**/*.scss', ['sass']);
  gulp.watch('src/views/*.pug', ['pug']);
  gulp.watch('src/views/**/*.pug', ['pug']);
  gulp.watch('src/views/images/*.jpg', ['image']);
});
