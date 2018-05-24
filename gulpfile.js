'use strict';

const gulp       = require('gulp'),
	  concat     = require('gulp-concat'),
	  cleanCss   = require('gulp-clean-css'),
	  rename     = require('gulp-rename'),
	  uglify     = require('gulp-uglify'),
      gutil      = require('gulp-util'),
      babel      = require('gulp-babel'),
      sass       = require('gulp-sass'),
      htmlmin    = require('gulp-htmlmin'),
	  stripDebug = require('gulp-strip-debug'),
      bs         = require('browser-sync').create();

// auto update browser on HTML, SCSS, or JS file changes
gulp.task('browser-sync', () => {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./sass/**/*.scss',['sass']);
    gulp.watch('./js/**/*.js',['javascript']);
    gulp.watch('./**/*.html',['html']);
});

// Handle javscript tasks
// Babel ES6+ -> ES5, concat files, minify, rename to bundle
gulp.task('javascript', () => {
    gulp.src(['./js/**/*.js'])
        .pipe(babel({
            presets: ['env']
            })).on('error', err => console.log(err))
        .pipe(concat('build.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename('build.min.js'))
        .pipe(gulp.dest('./dist'))
        // prompt brower-sync to reload browser
        .pipe(bs.reload({stream: true}));
})

// Handle sass and css tasks
// Sassy -> CSS, concat files, minify, rename, save to css folder 
gulp.task('sass', () => {
    gulp.src(['./sass/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(rename('build.min.css'))
        .pipe(gulp.dest('./dist'))
        // prompt brower-sync to reload browser
        .pipe(bs.reload({stream: true})); 
})

gulp.task('html', () => {
    gulp.src(['./**/*.html'])
        // Minify HTML
        // .pipe(htmlmin({collapseWhitespace: true}))
        // .pipe(gulp.dest('./'))
        // prompt brower-sync to reload browser
        .pipe(bs.reload({stream: true})); 
})

// prompt gulp to run in terminal "gulp start"
gulp.task('start', ['javascript', 'sass', 'html', 'browser-sync']);























