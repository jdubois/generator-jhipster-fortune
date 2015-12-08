'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var fs = require('fs-extra');
var helpers = require('yeoman-generator').test;

// TODO: this test does not run
describe('Files are created', function () {

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../test/.yo-rc.json'), dir);
      })
      .withPrompts({userFortune: 'my fortune'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'src/main/webapp/scripts/app/fortune/fortune.js'
    ]);
  });
});
