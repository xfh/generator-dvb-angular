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

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.Base.apply(this, arguments);

};

util.inherits(DirectiveGenerator, yeoman.Base);

DirectiveGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        type: 'confirm',
        name: 'needpartial',
        message: 'Does this directive need an external html file (i.e. partial)?',
        default: true
    }];

    cgUtils.addTypePrompt(this, prompts);

    cgUtils.addNamePrompt(this, prompts, 'directive');

    this.prompt(prompts, function (props) {
        if (props.name) {
            this.name = props.name;
        }
        this.needpartial = props.needpartial;
        cgUtils.askForModuleAndDir('directive', this, this.needpartial, cb);
    }.bind(this));

};

DirectiveGenerator.prototype.files = function files() {

    var configName = 'directiveSimpleTemplates';
    var defaultDir = 'templates/' + this.fileType + '/simple';
    if (this.needpartial) {
        configName = 'directiveComplexTemplates';
        defaultDir = 'templates/' + this.fileType + '/complex';
    }

    this.htmlPath = path.join(this.dir, this.name + '.html').replace(/\\/g, '/');

    cgUtils.processTemplates(this.name, this.dir, 'directive', this, defaultDir, configName, this.module);

};
