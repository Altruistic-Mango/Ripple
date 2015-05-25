// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');
var docco = require('gulp-docco');


// Lint Task
gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Documentation Tasks

var filesToDoc = ['./shout/www/js/*.js', 'app.js', './routes/*.js', './bin/www'];

gulp.task('concat', function() {
  return gulp.src(filesToDoc)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./docs/'));
});

gulp.task('docco', function() {
  return gulp.src('./docs/all.js')
    .pipe(docco())
    .pipe(gulp.dest('./docs/'));
});

// Compile Our Sass
//gulp.task('sass', function() {
//    return gulp.src('scss/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('css'));
//});

// Concatenate & Minify JS
//gulp.task('scripts', function() {
//    return gulp.src('js/*.js')
//        .pipe(concat('all.js'))
//        .pipe(gulp.dest('dist'))
//        .pipe(rename('all.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist'));
//});

// Watch Files For Changes
gulp.task('watch', function() {
  //gulp.watch('js/*.js', ['lint', 'scripts']);
  gulp.watch('js/*.js', ['lint']);
  //    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
//gulp.task('default', ['lint', 'scripts', 'watch']);
gulp.task('docs', ['concat', 'docco']);
gulp.task('default', ['lint', 'watch', 'docs']);
