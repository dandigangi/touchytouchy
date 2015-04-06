/*!
 * gulp
 * $ npm install del gulp gulp-react gulp-ruby-sass gulp-autoprefixer gulp-notify gulp-cache gulp-concat gulp-rename gulp-minify-css gulp-jshint gulp-uglify gulp-imagemin --save-dev
 */

var del = require('del');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var react = require('gulp-react');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

// Statics
var APP_NAME = 'TouchyTouchy';

var PATH_SOURCE = 'src/';
var PATH_SOURCE_ASSETS = PATH_SOURCE + 'assets/';
var PATH_SOURCE_JS = PATH_SOURCE_ASSETS + 'javascript/';
var PATH_SOURCE_CSS = PATH_SOURCE_ASSETS + 'css/';
var PATH_SOURCE_IMAGES = PATH_SOURCE_ASSETS + 'images/';

var PATH_BUILD = 'build/';
var PATH_BUILD_ASSETS = PATH_BUILD + 'assets/';
var PATH_BUILD_JS = PATH_BUILD_ASSETS + 'javascript/';
var PATH_BUILD_CSS = PATH_BUILD_ASSETS + 'css/';
var PATH_BUILD_IMAGES = PATH_BUILD_ASSETS + 'images/';

var CONFIG_AUTOPREFIX = 'last 2 versions';
var CONFIG_IMAGE_OPTIM = {
  optimizationLevel: 3,
  progressive: true,
  interlaced: true
};
var CONFIG_SASS = {
  style: 'expanded',
  compass: true,
  stopOnError: true
};

// Statics - Other
var FILENAME_SUFFIX_MIN = '.min';
var BUILD_MESSAGES = {
  JS: 'Javascript was successfully built and minified',
  CSS: 'CSS was successfully built & minified',
  IMAGES: 'Image assets have been compressed'
}

// Javascript
gulp.task('js', function() {
  return gulp.src(
      [
        PATH_SOURCE_JS + 'vendor/*.js',
        PATH_SOURCE_JS + 'helpers/*.js',
        PATH_SOURCE_JS + 'prototypes/*.js',
        PATH_SOURCE_JS + 'components/*.js',
        PATH_SOURCE_JS + 'main.js'
      ]
    )
    .pipe(react())
    .pipe(jshint('.jshintrc'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(PATH_BUILD_JS))
    .pipe(rename({
      suffix: FILENAME_SUFFIX_MIN
    }))
    .pipe(uglify())
    .pipe(gulp.dest(PATH_BUILD_JS))
    .pipe(notify({
      title: APP_NAME,
      message: BUILD_MESSAGES.JS
    }));
});

// CSS
gulp.task('css', function() {
  return sass((PATH_SOURCE_CSS + 'app.scss'), CONFIG_SASS)
    .pipe(
      autoprefixer({
        browsers: [CONFIG_AUTOPREFIX]
      })
    )
    .pipe(gulp.dest(PATH_BUILD_CSS))
    .pipe(rename({
      suffix: FILENAME_SUFFIX_MIN
    }))
    .pipe(minifycss({
      root: PATH_SOURCE_CSS
    }))
    .pipe(gulp.dest(PATH_BUILD_CSS))
    .pipe(notify({
      title: APP_NAME,
      message: BUILD_MESSAGES.CSS
    }));
});

// Images
gulp.task('images', function() {
  return gulp.src((PATH_SOURCE_IMAGES + '**/*'))
    .pipe(cache(imagemin(CONFIG_IMAGE_OPTIM)))
    .pipe(gulp.dest(PATH_BUILD_IMAGES))
    .pipe(notify({
      message: BUILD_MESSAGES.IMAGES
    }));
});

// Cleanup
gulp.task('clean', function(cb) {
  del([
      PATH_BUILD_JS,
      PATH_BUILD_CSS,
      PATH_BUILD_IMAGES
  ], cb)
});

// Builder
gulp.task('default', ['clean'], function() {
  gulp.start('js', 'css', 'images');
});
