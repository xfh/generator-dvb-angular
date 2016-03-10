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

var FilterGenerator = module.exports = function FilterGenerator(args, options, config) {

    cgUtils.getNameArg(this,args);

    yeoman.Base.apply(this, arguments);

};

util.inherits(FilterGenerator, yeoman.Base);

FilterGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    cgUtils.addTypePrompt(this, prompts);

    cgUtils.addNamePrompt(this,prompts,'filter');

    this.prompt(prompts, function (props) {
        if (props.name){
            this.name = props.name;
        }
        cgUtils.askForModuleAndDir('filter',this,false,cb);
    }.bind(this));


};

FilterGenerator.prototype.files = function files() {

    var defaultDir = 'templates/' + this.fileType;

    cgUtils.processTemplates(this.name,this.dir,'filter',this, defaultDir ,null,this.module);

};
