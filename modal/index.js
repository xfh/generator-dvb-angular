'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var cgUtils = require('../utils.js');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
var chalk = require('chalk');
var path = require('path');

var ModalGenerator = module.exports = function ModalGenerator(args, options, config) {

    cgUtils.getNameArg(this,args);

    yeoman.Base.apply(this, arguments);

};

util.inherits(ModalGenerator, yeoman.Base);

ModalGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    cgUtils.addTypePrompt(this, prompts);

    cgUtils.addNamePrompt(this,prompts,'modal');

    this.prompt(prompts, function (props) {
        if (props.name){
            this.name = props.name;
        }
        cgUtils.askForModuleAndDir('modal',this,true,cb);
    }.bind(this));

};

ModalGenerator.prototype.files = function files() {

    this.ctrlname = _.camelize(_.classify(this.name)) + 'Ctrl';
    var defaultDir = 'templates/' + this.fileType;

    cgUtils.processTemplates(this.name,this.dir,'modal',this,defaultDir,null,this.module);

    setTimeout((function(){

        console.log('');
        console.log('  Open this modal by using ' + chalk.bold('angular-ui-bootstrap') + ' module\'s ' + chalk.bold('$modal') + ' service:');
        console.log('');
        console.log('  $modal.open({');
        console.log('      templateUrl: \'' + path.join(this.dir,this.name + '.html') + '\',');
        console.log('      controller: \''+ this.ctrlname +'\'');
        console.log('  }).result.then(function(result){');
        console.log('      //do something with the result');
        console.log('  });');
        console.log('');

    }).bind(this),200);

};
