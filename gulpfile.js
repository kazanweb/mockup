'use strict';

var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var tasks = require('./gulp/config/tasks');
var template = require('./config.json').template;

global.app = {};
global.app.gulp = gulp;
global.app.gulpPlugins = gulpPlugins;
global.app.browserSync = browserSync;
global.app.webpack = webpack;
global.app.gulpWebpack = gulpWebpack;
global.app.mode = process.env.NODE_ENV || 'development';
global.app.template = template;

tasks.forEach(function (taskPath) {
	require(taskPath)();
});

gulp.task('default', gulp.parallel('watch', 'webserver'));

gulp.task('build', gulp.parallel('js', 'scss', 'images', 'fonts', 'nunjucks', 'ajax'));
