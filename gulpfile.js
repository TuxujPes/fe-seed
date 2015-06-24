// generic tools
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var _ = require('underscore');
var runSequence = require('run-sequence');
var notifier = require('node-notifier');

// gulp and gulp plugins
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// CONFIGS
var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

var paths = {};
paths.jsDir = './app/scripts';
paths.jsFiles = paths.jsDir + '/**/*.js';
paths.jsEntry = paths.jsDir + '/main.js';
paths.jsOut = 'bundle.js';
paths.html = './app/index.html';
paths.buildDir = isProd ? './dist' : './build';
paths.styles = '/style';
paths.script = '/scripts';

// TASKS
gulp.task('default', ['build']);
gulp.task('build', buildApplication);
gulp.task('serve', ['browserifyWatch', 'appWatch']);

// clean folders
gulp.task('delete_build', function() {
  del(paths.buildDir);
});

gulp.task('appWatch', function() {
  gulp.watch(paths.jsFiles, ['scripts_styleguide_brief']);
});

// code healthiness
/**
 * only JSCS
 * should not take much time to run
 * use in watcher
 */
gulp.task('scripts_styleguide_brief', function() {
  return gulp.src(paths.jsFiles).pipe($.jscs());
});

/**
 * both JSCS and ESLINT
 * takes quite some time due to babel parser
 * use in builds
 */
gulp.task('scripts_styleguide_full', function() {
  return gulp.src(paths.jsFiles)
    .pipe($.jscs())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

// HTML
// note - for now just copies html,
// in future will be used to change content of html
gulp.task('buildHtml', function() {
  return gulp.src(paths.html)
    .pipe($.useref())
    .pipe(gulp.dest(paths.buildDir))
    .pipe($.size());
});

// BROWSERIFY
var browserifyOptions = {
  entries: [paths.jsEntry],
  debug: !isProd,
  fullPaths: true,
  transform: [babelify]
};

var watchifyOptions = _.extend({
  cache: {},
  packageCache: {}
}, browserifyOptions);

var bundler = browserify(browserifyOptions);
var watchBundler = watchify(browserify(watchifyOptions));

gulp.task('browserifyBundle', function() {
  return bundler.bundle()
    .pipe(source(paths.jsOut))
    .pipe(gulp.dest(paths.buildDir + paths.script));
});

gulp.task('browserifyWatch', function() {
  watchBundler.on('update', watchifyBundle);
  return watchBundler.bundle(); // needed too keep process running
});

// TODO : exit process somehow
function watchifyBundle() {
  return watchBundler.bundle()
    .on('error', $.util.log.bind($.util, 'Browserify Error'))
    .pipe(source(paths.jsOut))
    .pipe(gulp.dest(paths.buildDir + paths.script));
}

// BROWSERIFY EVENTS
bundler.on('error', $.util.log.bind($.util, 'Browserify Error'));

watchBundler.on('time', function(time) {
  $.util.log('Browserify rebundle finished after ' + $.util.colors.magenta(time + ' ms'));
});

/**
 * run task in sequence:
 * clear build folder then check style and only then build app
 */
function buildApplication() {
  runSequence(
    'delete_build',
    'scripts_styleguide_full',
    ['buildHtml', 'browserifyBundle'],
    notifySuccess);
}

/**
 * small popup with result of a build
 */
function notifySuccess(err) {
  notifier.notify({
    title: 'GULP BUILD ' + (err ? 'FAILED' : 'SUCCESS'),
    message: err ? 'at ' + err.message : '✔ ' + env
  });
}
