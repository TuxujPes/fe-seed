// generic tools
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var _ = require('underscore');
var runSequence = require('run-sequence');
var notifier = require('node-notifier');
var minifycss = require('gulp-minify-css');

// for mock requests
var bodyParser = require('body-parser');
var mockMiddleware = require('./mocks/mock_middleware');

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

paths.scssDir = './app/styles';
paths.scssFiles = paths.scssDir + '/**/*.scss';
paths.scssEntry = paths.scssDir + '/main.scss';
paths.cssOut = 'styles.css';

paths.html = './app/index.html';
paths.buildDir = isProd ? './dist' : './build';
paths.cssBuildDir = paths.buildDir + '/styles';
paths.script = '/scripts';
paths.imgDir = './app/images';


// MAIN TASKS
gulp.task('default', ['build']);
/**
 * run task in sequence:
 * clear build folder then check style and only then build app
 */
gulp.task('build', function() {
  runSequence(
    'cleanBuildFolder',
    'scriptsStyleguideFull',
    ['buildHtml', 'buildStyles', 'buildScripts'],
    notifySuccess);
});
/**
* start web server and watchers to recompile on file changes
*/
gulp.task('serve', ['startDevServer', 'browserifyWatch', 'appWatch']);

// SUB TASKS
// clean folders
gulp.task('cleanBuildFolder', function() {
  del(paths.buildDir);
});

gulp.task('appWatch', function() {
  gulp.watch(paths.jsFiles, ['scriptsStyleguideBrief']);
  gulp.watch(paths.scssFiles, ['buildStyles']);
});

gulp.task('startDevServer', function() {
  gulp.src(paths.buildDir)
    .pipe($.webserver({
      port: 3000,
      middleware: [bodyParser.json(), mockMiddleware],
      livereload: true
    }));
});

// CSS
gulp.task('buildStyles', function() {
  return gulp.src(paths.scssFiles)
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.sass().on('error', $.sass.logError))

    // todo: clean this task minification process
    .pipe($.autoprefixer({browsers: ['> 5%', 'last 2 versions']}))
    .pipe($.if(!isProd, $.sourcemaps.write()))
    .pipe($.if(isProd, minifycss()))
    .pipe(gulp.dest(paths.cssBuildDir));
});

// code healthiness
/**
 * only JSCS
 * should not take much time to run
 * use in watcher
 */
gulp.task('scriptsStyleguideBrief', function() {
  return gulp.src(paths.jsFiles).pipe($.jscs());
});

/**
 * both JSCS and ESLINT
 * takes quite some time due to babel parser
 * use in builds
 */
gulp.task('scriptsStyleguideFull', function() {
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

/*
  IMAGES
  optimizer 
*/
var optimizationConfig = {
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
};

gulp.task('imageOptimization', function(cb) {
  gulp.src(paths.imgDir + '/*.*')
  .pipe($.imageOptimization(optimizationConfig))
  .pipe(gulp.dest(paths.buildDir +'/images')).on('end', cb).on('error', cb);
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

gulp.task('buildScripts', function() {
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
 * small desktop popup with result of a build
 */
function notifySuccess(err) {
  notifier.notify({
    title: 'GULP BUILD ' + (err ? 'FAILED' : 'SUCCESS'),
    message: err ? 'at ' + err.message : '✔ ' + env
  });
}
