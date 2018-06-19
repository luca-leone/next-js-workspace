/**
  @license
  Copyright Luca Leone <contact@lucaloene.io>. All Rights Reserved.

  Use of this source code is governed by an MIT-style license that can be
  found in the LICENSE file at https://github.com/luca-leone/workspace/blob/master/LICENSE
 */

'use strict';


var fs = require('fs');
var gulp = require('gulp');
var rollup = require('gulp-better-rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var info = require('./package.json');


/**
 * @func capitalize
 * @param {string} name
 * @returns {Array<String>} 
 * @description It transforms first word letter uppercase.
 */
function capitalize(name) {
  var tmp = (name) ? name.split('-').join(' ') : '';
  return (tmp) ? tmp.charAt(0).toUpperCase() + tmp.slice(1) : '';
}

/**
 * @func banner
 * @returns {string}
 * @description Print a comment on dist files containing info about app author and license.
 * All info are taken from package.json file.
 */
function banner() {
  var app = ' ' + capitalize(info.name) + ' v' + info.version + '';
  var author = ' (c) ' + info.author + ' ';
  var license = ' License: ' + info.license + ''
  
  return ['/*', app, author, license, ' */', ''].join('\n');
}

/**
 * @func task 
 * @name compile:js
 * @description It compiles ES6 to ES5 syntax; reduces all files into only one bundle; 
 * minifies the resulting js file. All tasks are made thanks to the following pipeline.
 */
gulp.task('compile:js', function () {

  // Check if src/index.js exists. Otherwise creates it. 
  var content = '/**\n This is workspace entry point.\n Write main application logic and import here all public files here.\n*/\n';
  if (!fs.existsSync('./src/index.js')) fs.writeFileSync('./src/index.js', content);

  return gulp.src('src/index.js')
    .pipe(rollup({ plugins: [babel()] }, 'umd'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(header(banner(), { info: info }))
    .pipe(gulp.dest('dist'));
});

/**
 * @func task
 * @callback compiler
 * @description It executes all stream defined for each previous tasks
 */
gulp.task('compiler', ['compile:js']);

/**
 * @func task
 * @callback watch
 * @description It observes files' changes for each specified directory
 * and executes an array of tasks to complete before 'watch.
 */
gulp.task('watcher', function () {
  gulp.watch("src/**/*.js", ['compile:js']);
});

/**
 * @function task
 * @description Default 'Gulp' task. 
 * First it executes all build processes, then runs watchers 
 * which re-executes the appropriate task streams at every file changes.
 */
gulp.task('default', ['compiler', 'watcher']);
