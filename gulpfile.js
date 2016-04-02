'use strict';

var config = {
    less: ['./source/less/reset.less'],
    js: [],
    devTasks: ['init', 'css', 'js', 'handlebars'],
    prodTasks: ['init', 'css-prod', 'js-prod', 'handlebars-prod']
}

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var gulp = require('gulp');
//var handlebars = require('gulp-compile-handlebars');
var handlebarsTasks = require('./gulpfile-handlebars');
var jshint = require('gulp-jshint');
var jsonlint = require("gulp-jsonlint");
var less = require('gulp-less');
var minifyCSS = require('gulp-clean-css');
var path = require('path');
var uglify = require('gulp-uglify');
var version = require('./package.json').version;

handlebarsTasks(gulp);
// Dependent tasks will be executed before others
gulp.task('init', ['jsonlint', 'jshint'], function () {
    return;
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

gulp.task('css', function() {
    var filename = 'tuba_' + version + '.css';
    return gulp.src(config.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat(filename))
    .pipe(gulp.dest('./output'));
});
gulp.task('css-prod', function() {
    var filename = 'tuba_' + version + '.css';
    var opts = {
        keepBreaks: false,
        compatibility: 'ie8',
        keepSpecialComments: 0
    };
    return gulp.src(config.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat(filename))
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./output'));
});

gulp.task('js', function () {
    var filename = 'tuba_' + version + '.js';
    return gulp.src(config.js)
    .pipe(concat(filename))
    .pipe(gulp.dest('./output'));
});
gulp.task('js-prod', function () {
    var filename = 'tuba_' + version + '.js';
    return gulp.src(config.js)
    .pipe(concat(filename))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./output'));
});

gulp.task('build-dev', config.devTasks, function (done) {return});
gulp.task('build', config.prodTasks, function (done) {return});