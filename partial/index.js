'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var cgUtils = require('../utils.js');
var _ = require('underscore');
var chalk = require('chalk');
var fs = require('fs');
var url = require('url');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var PartialGenerator = module.exports = function PartialGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.Base.apply(this, arguments);

};

util.inherits(PartialGenerator, yeoman.Base);

PartialGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'route',
            message: 'Enter your route url (i.e. /mypartial/:id).  If you don\'t want a route added for you, leave this empty.'
        },
        {
            name: 'state',
            message: 'Enter a state-name. Leave empty, if you want state name to be route. Will be ignored, if route is empty.'
        },
        {
            name: 'title',
            message: 'Enter a page title for the state if you set a route. Leave empty if no route is given or state name should be used.'
        },
        {
            name: 'controllerAs',
            message: 'What should be the variable name for the controller (controllerAs)',
            default: 'vm'
        }
    ];

    cgUtils.addNamePrompt(this, prompts, 'partial');

    this.prompt(prompts, function (props) {
        if (props.name) {
            this.name = props.name;
        }
        this.route = url.resolve('', props.route);
        this.controllerAs = _.camelize(props.controllerAs);
        this.stateName = props.state;
        this.pageTitle = props.title || (props.state || this.name);

        cgUtils.askForModuleAndDir('partial', this, true, cb);
    }.bind(this));
};

PartialGenerator.prototype.files = function files() {

    this.ctrlname = _.camelize(_.classify(this.name)) + 'Controller';
    this.controllerAs = _.camelize(this.name) + 'Ctrl';

    cgUtils.processTemplates(this.name, this.dir, 'partial', this, null, null, this.module);

    if (this.route && this.route.length > 0) {
        var partialUrl = this.dir + this.name + '.html';
        cgUtils.injectRoute(
            this.module.file,
            true,
            (this.stateName || this.name),
            this.ctrlname,
            this.controllerAs,
            this.route,
            partialUrl,
            this.pageTitle,
            this);
    }

};
