'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-dvb-angular:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({someOption: true})
            .withPrompts({someAnswer: true})
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            '.jshintrc',
            '.jshintignore',
            '.jscsrc',
            '.gitignore',
            '.gitattributes',
            '.editorconfig',
            'package.json',
            'index.html',
            'src/app.module.less',
            'src/app.module.js',
            'src/core/core.module.js',
            'src/core/core.module.less',
            'src/core/core.route.js',
            'src/core/config.js',
            'src/core/constants.js',
            'src/dvbModules/router/router.module.js',
            'src/dvbModules/router/route-helper-provider.js',
            'Gruntfile.js'
        ]);
    });
});
