/*!
 * gulp
 * $ npm install del gulp-ruby-sass gulp-sourcemaps gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev
 */

// Modules
var del = require('del');

// Gulp
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

// Gulp Plugins
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

// CSS
gulp.task('css', function() {
  return sass('src/assets/css/app.scss', {
      style: 'expanded',
      compass: true,
      stopOnError: true
    })
    .pipe(
      autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')
    )
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss({
      root: 'src/assets/css'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({
      message: 'CSS build complete!'
    }));
});

// Images (CSS)
gulp.task('images-css', function() {
  return gulp.src('src/assets/css/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/css/images'))
    .pipe(notify({
      message: 'CSS image compressions complete!'
    }));
});

// Javascript
gulp.task('javascript', function() {
  return gulp.src(
      [
        'src/assets/javascript/vendor/*.js',
        'src/assets/javascript/app.js'
      ]
    )
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/assets/javascript'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/javascript'))
    .pipe(notify({
      message: 'Javascript build complete!'
    }));
});

// Images (Main)
gulp.task('images', function() {
  return gulp.src('src/assets/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 4,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(notify({
      message: 'Main image compressions complete!'
    }));
});

// Cleanup
gulp.task('clean', function(cb) {
  del(['dist/assets/css', 'dist/assets/javascript', 'dist/assets/images'], cb)
});

// Builder
gulp.task('default', ['clean'], function() {
  gulp.start('css', 'images-css', 'javascript', 'images');
});

// Watchers
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);
});