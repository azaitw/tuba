var handlebars = require('gulp-compile-handlebars');
var inlinesource = require('gulp-inline-source');
var minifyHTML = require('gulp-minify-html');
var rename = require('gulp-rename');

module.exports = function (gulp) {
    gulp.task('hbs-index', function () {
        var data = require('./source/data/data.json').index;
        var options = {
            ignorePartials: true,
            batch : ['./source/templates/partials']
        };
        return gulp.src('./source/templates/index.handlebars')
        .pipe(handlebars(data, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./output'));
    });
    gulp.task('hbs-index-zh', function () {
        var data = require('./source/data/zh/data.json').index;
        var options = {
            ignorePartials: true,
            batch : ['./source/templates/partials']
        };
        return gulp.src('./source/templates/index.handlebars')
        .pipe(handlebars(data, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./output/zh'));
    });

    gulp.task('handlebars', ['hbs-index', 'hbs-index-zh'], function () {
        return;
    });
    gulp.task('handlebars-prod', function () {
        var optsHtml = {
          conditionals: true,
          spare: true
        };
        var optsInline = {
            swallowErrors: true
        };
        return gulp.src('./output/**/*.html')
        .pipe(inlinesource(optsInline))
        .pipe(minifyHTML(optsHtml))
        .pipe(gulp.dest('./output'));
    });
};