'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var cgUtils = require('../utils.js');
var _ = require('underscore');
var fs = require('fs');
var htmlWiring = require('html-wiring');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var CgangularGenerator = module.exports = function CgangularGenerator(args, options, config) {
    yeoman.Base.apply(this, arguments);

    this.on('end', function () {
        this.config.set('partialDirectory', 'partial/');
        this.config.set('modalDirectory', 'partial/');
        this.config.set('directiveDirectory', 'directive/');
        this.config.set('filterDirectory', 'filter/');
        this.config.set('serviceDirectory', 'service/');
        var inject = {
            js: {
                file: 'src/index.html',
                marker: cgUtils.JS_MARKER,
                template: '<script src="<%= filename %>"></script>'
            },
            less: {
                relativeToModule: true,
                file: '<%= module %>.less',
                marker: cgUtils.LESS_MARKER,
                template: '@import "<%= filename %>";'
            }
        };
        var primaryModuleName = _.camelize(this.appname);
        var coreModuleName = primaryModuleName + '.core';
        this.config.set('inject', inject);
        this.config.set('primaryModule', primaryModuleName);
        var modules = [
            {
                name: primaryModuleName,
                file: path.join(this.dir, 'app.module.js')
            },
            {
                name: coreModuleName,
                file: path.join(this.dir, 'core/core.module.js')
            }
        ];
        this.config.set('modules', modules);
        this.config.save();
        this.installDependencies({npm: true, bower: false, skipInstall: options['skip-install']});
    });

    this.pkg = JSON.parse(htmlWiring.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CgangularGenerator, yeoman.Base);

CgangularGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'appname',
            message: 'What would you like the angular app/module name to be?',
            default: path.basename(process.cwd())
        }
    ];

    this.prompt(prompts, function (props) {
        this.appname = _.str.camelize(props.appname);
        this.dir = 'src/';
        this.appJs = this.appname + '.js';
        this.appLess = this.appname + '.less';
        this.nodeModulesDir = path.relative(path.join('.', this.dir), './node_modules');
        cb();
    }.bind(this));
};

CgangularGenerator.prototype.app = function app() {
    this.directory('skeleton/', './');
};
