var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var karma = require('karma').server;
var ngConstant = require('gulp-ng-constant');

//Paths to source files
// note: js files need to have the module files concated first otherwise angular breaks
var paths = {
  sass: ['./scss/**/*.scss'],
  js:   ['./www/app/**/*module.js',
         './www/app/**/*.js',
         '.www/app/config.js'],
  dist: ['./www/dist/*.js']
};

//Main gulp task
gulp.task('default', ['scripts', 'constant', 'watch']);

//Script for all gulp tasks, used in default and watch
gulp.task('scripts', ['sass', 'jshint', 'clean', 'concat']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function() {
  return gulp.src(paths.dist)
    .pipe(clean());
});

gulp.task('concat', function() {
  return gulp.src(paths.js)
    .pipe(concat('shout.js'))
    .pipe(gulp.dest('./www/dist/'));
});

gulp.task('watch', function() {
  gulp.watch([paths.sass, paths.js], ['scripts']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('constant', function() {
  gulp.src('./config.json')
    .pipe(ngConstant())
    .pipe(gulp.dest("./www/app/"));
});


//Test Task
gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/tests/my.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});
