'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.Base.apply(this, arguments);

    this.uirouter = this.config.get('uirouter');
};

util.inherits(ModuleGenerator, yeoman.Base);

ModuleGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    var that = this;

    var prompts = [
        {
            name: 'dir',
            message: 'Where would you like to create the module (must specify a subdirectory)?',
            default: function (data) {
                var module = cgUtils.getPrimaryModule(that);
                var basedir = module ? path.dirname(module.file) : '.';
                return path.join(basedir, that.name || data.name, '/');
            },
            validate: function (value) {
                value = _.str.trim(value);
                if (_.isEmpty(value) || value[0] === '/' || value[0] === '\\') {
                    return 'Please enter a subdirectory.';
                }
                return true;
            }
        }
    ];

    cgUtils.addNamePrompt(this, prompts, 'module');

    this.prompt(prompts, function (props) {
        if (props.name) {
            this.name = props.name;
        }
        this.dir = path.join(props.dir, '/');
        cb();
    }.bind(this));
};

ModuleGenerator.prototype.files = function files() {
    var fileType = cgUtils.getFileType(this);
    var module = cgUtils.getParentModule(this, path.join(this.dir, '..'));
    module.dependencies.modules.push(_.camelize(this.name));
    module.save();
    this.log.writeln(chalk.green(' updating') + ' %s', path.basename(module.file));

    var defaultDir = 'templates/' + fileType;

    cgUtils.processTemplates(this.name, this.dir, 'module', this, defaultDir, null, module);

    var modules = this.config.get('modules');
    if (!modules) {
        modules = [];
    }
    modules.push({name: _.camelize(this.name), file: path.join(this.dir, this.name + '.module.' + fileType)});
    this.config.set('modules', modules);
    this.config.save();
};
