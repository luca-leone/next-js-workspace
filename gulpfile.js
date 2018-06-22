/**
  @license
  Copyright Luca Leone <contact@lucaloene.io>. All Rights Reserved.

  Use of this source code is governed by an MIT-style license that can be
  found in the LICENSE file at https://github.com/luca-leone/workspace/blob/master/LICENSE
 */

'use strict';


var fs = require('fs-extra');
var gulp = require('gulp');
var rollup = require('gulp-better-rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var chokidar = require('chokidar');
var info = require('./package.json');


/**
 * @func capitalize
 * @param {string} name
 * @return {string} 
 * @description Make first letter uppercase.
 */
function capitalize(name) {
  var tmp = (name) ? name.split('-').join(' ') : '';
  return (tmp) ? tmp.charAt(0).toUpperCase() + tmp.slice(1) : '';
}

/**
 * @func banner
 * @return {string}
 * @description Add an header comment on dist files containing info about author and license.
 *              All info are taken from package.json file.
 */
function banner() {
  var app = ' ' + capitalize(info.name) + ' v' + info.version + '';
  var author = ' (c) ' + info.author + ' ';
  var license = ' License: ' + info.license + ''
  return ['/*', app, author, license, ' */', ''].join('\n');
}

/**
 * @function indexJS
 * @return {void}
 * @description Checks if src/index.js exists. Otherwise creates it.
 */
function indexJS() {
  var indexHeader = '/**\n' +
    '  Application entry point.\n  Main business logic and import / exports\n  statements for main modules should take place here.\n*/\n'; 
  if (!fs.existsSync('src')) fs.mkdirSync('src');
  if (!fs.existsSync('src/index.js')) fs.writeFileSync('src/index.js', indexHeader);
}

/**
 * @function checkpoint
 * @return {pipeline}
 * @description Checks if app entry point (index.js) exists. 
 *              Otherwise creates it. After a callback is executed. 
 */
function checkpoint(callback) {
  indexJS();
  // [...] other compiler
  return (callback) ? callback() : function() {};
}

/**
 * @function createDirectory
 * @returns {pipeline}
 * @description Creates directory tree within dist based on src folders tree.
 */
function createDirectory() {
  return gulp.src('src/**/*').pipe(gulp.dest('dist'));
}

/**
 * @function compileJS
 * @return {pipeline}
 * @description Compiles and minifies from ES6 to ES5 syntax.
 */
function compileJS() {  
  return gulp.src('src/**/*.js')
    .pipe(rollup({ plugins: [babel()] }, 'umd'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(header(banner(), { info: info }))
    .pipe(gulp.dest('dist'));
}

/**
 * @function unlink
 * @param {object} info
 * @return {void} 
 * @description Can remove files and /or direcrories.
 */
function unlink(info) {
  fs.removeSync(info.target); // Remove file and / or directory.
  checkpoint();                  // Entry point file must always exists.
}

/**
 * @function compile
 * @returns {void}
 * @description Simply runs compilers.
 */
function compile() {
  compileJS();
  // [..] other compiler
}

/**
 * @function events
 * @param {object} info
 * @return {void}
 * @description Executes a series of tasks. 
 */
function events(info) { 
  if (info.evt === 'unlinkDir' || info.evt === 'unlink') unlink(info);
  if (info.evt === 'addDir') createDirectory();
  if (info.evt === 'add' || info.evt === 'change') compile();
}

/**
 * @function observer
 * @return {void}
 * @description Observes what happens on src folder so that 
 *              it's possible to run the appropriate stream of tasks.
 */
function observer() {
  checkpoint(function() {
    chokidar.watch('src/**/*').on('all', function (evt, path, info = {}) {
      events(info = {
        target: path.replace('src', 'dist'),
        path: path,
        evt: evt,
      });
    });
  });
}

/**
 * @func task
 * @name cleaner
 * @return {void}
 * @description Clean dist folder everytime new start command is launched.
 */
gulp.task('cleaner', function () {
  fs.removeSync('dist');
});

/**
 * @function task
 * @return {void}
 * @description Default 'Gulp' task. Cleans and runs workspace.
 */
gulp.task('default', ['cleaner'], function() { 
  observer();
});
