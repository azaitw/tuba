'use strict';

var version = require('./package.json').version;
var config = {
    less: ['reset.less', 'common.less', 'header.less', 'body.less'],
    js: ['tuba.js'],
    devTasks: ['init', 'images', 'css', 'js', 'handlebars'],
    prodTasks: ['init', 'images', 'css-prod', 'js-prod', 'handlebars-prod'],
    fileNames: {
        css: 'tuba_' + version + '.css',
        js: 'tuba_' + version + '.js'
    }
};

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsonlint = require("gulp-jsonlint");
var less = require('gulp-less');
var minifyCSS = require('gulp-clean-css');
var nodemon = require('gulp-nodemon');
var path = require('path');
var uglify = require('gulp-uglify');

var handlebarsTasks = require('./gulpfile-handlebars');

handlebarsTasks(gulp, config);
// Dependent tasks will be executed before others
gulp.task('init', ['jsonlint', 'jshint'], function (done) {
    return done;
});

gulp.task('jsonlint', function () {
    return gulp.src('./source/data/**/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});
gulp.task('jshint', function () {
    return gulp.src(config.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('images', function() {
    return gulp.src('./source/images/**/*')
    .pipe(gulp.dest('./assets/images'));
});

gulp.task('css', function() {
    var filename = 'tuba_' + version + '.css';
    var appendPath = function (files) {
        var prefix = './source/less/';
        var result = [];
        var i;
        for (i = 0; i < files.length; i += 1) {
            result.push(prefix + files[i]);
        }
        return result;
    };
    var lessFiles = appendPath(config.less);
    return gulp.src(lessFiles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat(filename))
    .pipe(gulp.dest('./assets'));
});
gulp.task('css-prod', function() {
    var filename = 'tuba_' + version + '.css';
    var appendPath = function (files) {
        var prefix = './source/less/';
        var result = [];
        var i;
        for (i = 0; i < files.length; i += 1) {
            result.push(prefix + files[i]);
        }
        return result;
    };
    var lessFiles = appendPath(config.less);
    var opts = {
        keepBreaks: false,
        compatibility: 'ie8',
        keepSpecialComments: 0
    };
    return gulp.src(lessFiles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat(filename))
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./assets'));
});

gulp.task('js', function () {
    var filename = 'tuba_' + version + '.js';
    var appendPath = function (files) {
        var prefix = './source/js/';
        var result = [];
        var i;
        for (i = 0; i < files.length; i += 1) {
            result.push(prefix + files[i]);
        }
        return result;
    };
    var jsFiles = appendPath(config.js);
    return gulp.src(jsFiles)
    .pipe(concat(filename))
    .pipe(gulp.dest('./assets'));
});
gulp.task('js-prod', function () {
    var filename = 'tuba_' + version + '.js';
    return gulp.src(config.js)
    .pipe(concat(filename))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./assets'));
});

gulp.task('dev', function () {
  nodemon({
      script: 'server.js',
      ext: 'handlebars less js',
      tasks: ['build-dev']
  })
})

gulp.task('build-dev', config.devTasks);
gulp.task('build', config.prodTasks, function (done) {return done()});