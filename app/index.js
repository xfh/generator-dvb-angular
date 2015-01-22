'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var cgUtils = require('../utils.js');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var CgangularGenerator = module.exports = function CgangularGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.config.set('partialDirectory','partial/');
        this.config.set('modalDirectory','partial/');
        this.config.set('directiveDirectory','directive/');
        this.config.set('filterDirectory','filter/');
        this.config.set('serviceDirectory','service/');
        var inject = {
            js: {
                file: 'index.html',
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
        this.config.set('inject',inject);
        this.config.set('primaryModule', _.camelize(this.appname));
        var modules = [
            {
                name: _.camelize(this.appname),
                file: path.join(this.dir, this.appname + '.js')
            }
        ];
        this.config.set('modules', modules);
        this.config.save();
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CgangularGenerator, yeoman.generators.Base);

CgangularGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'appname',
            message: 'What would you like the angular app/module name to be?',
            default: path.basename(process.cwd())
        },
        {
            name: 'dir',
            message: 'Where would you like to create the main module?',
            default: '.',
            validate: function (value) {
                value = _.str.trim(value);
                if (_.isEmpty(value)) {
                    return 'Please enter a value.';
                }
                return true;
            }
        }
    ];

    this.prompt(prompts, function (props) {
        this.appname = props.appname;
        this.dir = path.join(props.dir, path.sep);
        this.appJs = path.join(this.dir, this.appname + '.js');
        this.appLess = path.join(this.dir, this.appname + '.less');
        this.bowerDir = path.relative(path.join('.', this.dir), './bower_components');
        cb();
    }.bind(this));
};

CgangularGenerator.prototype.askForUiRouter = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'router',
        type:'list',
        message: 'Which router would you like to use?',
        default: 0,
        choices: ['Standard Angular Router','Angular UI Router']
    }];

    this.prompt(prompts, function (props) {
        if (props.router === 'Angular UI Router') {
            this.uirouter = true;
            this.routerJs = 'angular-ui-router/release/angular-ui-router.js';
            this.routerModuleName = 'ui.router';
            this.routerViewDirective = 'ui-view';
        } else {
            this.uirouter = false;
            this.routerJs = 'angular-route/angular-route.js';
            this.routerModuleName = 'ngRoute';
            this.routerViewDirective = 'ng-view';
        }
        this.config.set('uirouter',this.uirouter);
        cb();
    }.bind(this));
};

CgangularGenerator.prototype.app = function app() {
    var that = this;
    this.directory('skeleton/','./');

    var templateDirectory = path.join(__dirname, 'templates', 'application');
    _.chain(fs.readdirSync(templateDirectory))
        .filter(function (template) {
            return template[0] !== '.';
        })
        .each(function (template) {
            var customTemplateName = template.replace('app', that.appname);
            var templateFile = path.join(templateDirectory, template);
            var outputFile = path.join(that.dir, customTemplateName);
            //create the file
            that.template(templateFile, outputFile);
        });
};
