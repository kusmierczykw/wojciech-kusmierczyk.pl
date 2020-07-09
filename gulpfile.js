'use strict';

// Insert the full localhost address to the page
// [localhostPageAddress = "localhost/coaching.chudzik.pl"]
var localhostPageAddress = "localhost/wojciech-kusmierczyk.pl/";

var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-clean-css'),
    sass = require('gulp-sass');

gulp.task('connect-sync', ['sass|autoprefixer'], function () {
    connect.server({}, function () {
        browserSync({
            proxy: localhostPageAddress,
            port: 8080
        });
    });

    gulp.watch('**/*.scss', ['sass|autoprefixer']);
    gulp.watch('**/*.html').on('change', function () {
        browserSync.reload();
    });
});

gulp.task('sass|autoprefixer', function () {
    return gulp.src('**/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['connect-sync']);
