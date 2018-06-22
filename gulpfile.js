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
 * @returns {string} 
 * @description Make first letter uppercase.
 */
function capitalize(name) {
  var tmp = (name) ? name.split('-').join(' ') : '';
  return (tmp) ? tmp.charAt(0).toUpperCase() + tmp.slice(1) : '';
}

/**
 * @func banner
 * @returns {string}
 * @description Add an header comment on dist files containing info 
 * about app author and license.
 * All info are taken from package.json file.
 */
function banner() {
  var app = ' ' + capitalize(info.name) + ' v' + info.version + '';
  var author = ' (c) ' + info.author + ' ';
  var license = ' License: ' + info.license + ''
  return ['/*', app, author, license, ' */', ''].join('\n');
}

/**
 * @function play
 * @param {callback} events
 * @description Checks if app entry point (index.js) exists. 
 * Otherwise creates it. After a callback is executed. 
 */
function play(events) {
  var content = '/**\n' +
    '   Application entry point. It must always within src/ folder.\n' +
    '   Consider it as a place where expose app main modules out of project or\n' +
    '   to write business logic core.\n' +
    '*/\n';

  // Checks if src/index.js exists. Otherwise creates it. 
  // TODO: check if dist/ folder exists
  if (!fs.existsSync('src/index.js')) fs.writeFileSync('src/index.js', content);
  return (events) ? events() : function() {};
}

/**
 * @func task 
 * @name compileJS
 * @param {string}
 * @description Compiles ES6 to ES5 syntax; reduces all files into only one bundle; 
 * minifies the resulting js file. All tasks are made thanks to the following pipeline.
 */
function compileJS(path = '') {
    // TODO: add play ehere
    path = (!path) ? 'src/**/*.js' : path;
  
    return gulp.src(path)
      .pipe(rollup({ plugins: [babel()] }, 'umd'))
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(uglify())
      .pipe(header(banner(), { info: info }))
      .pipe(gulp.dest('dist'));
}

/**
 * @function events
 * @description Executes a series of tasks. 
 */
function events() { 
  compileJS();
  // Other Tasks [..]
}

/**
 * @function observer
 * @description Observes what happens on src folder and run the appropriate stream of tasks.
 */
function observer() {
  chokidar
    .watch('src/**/*')
    .on('all', function (evt, path, target) {
      target = path.replace('src', 'dist');
      // console.log(evt);
      if (evt === 'unlinkDir' || evt === 'unlink') fs.removeSync(target);
      if (evt === 'add' || evt === 'addDir') compileJS(path);
    }
  );
}


/**
 * @func task
 * @name cleaner
 * @description Clean dist folder everytime new start command is launched.
 */
gulp.task('cleaner', function () {
  fs.removeSync('dist/**/*');
});

/**
 * @func task
 * @callback compiler
 * @description Executes a stream of defined tasks.
 */
gulp.task('compiler', function() { 
  play(events); 
});

/**
 * @function task
 * @description Default 'Gulp' task. Cleans and runs workspace.
 */
gulp.task('default', ['cleaner'], function() { 
  observer();
});
