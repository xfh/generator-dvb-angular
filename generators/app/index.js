'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var DvbBase = yeoman.generators.Base.extend({
    copyFile: function (src, dst) {
        this.fs.copy(this.templatePath(src), this.destinationPath(dst));
    },

    copyTpl: function (src, dst, ejsParams) {
        this.fs.copyTpl(this.templatePath(src), this.destinationPath(dst), ejsParams);
    }
});

var IndentStyle = {space: 'spaces', tab: 'tabs'};

module.exports = DvbBase.extend({

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the classy ' + chalk.red('generator-dvb-angular') + ' generator!'
        ));

        var prompts = [
            {
                type: 'input',
                name: 'appname',
                message: 'What would you like the angular app/module name to be?',
                //default: path.basename(process.cwd())
            },
            {
                type: 'list',
                name: 'indentStyle',
                message: 'Would you like spaces or tab indentation?',
                choices: [IndentStyle.space, IndentStyle.tab]
            },
            {
                type: 'input',
                name: 'directivePrefix',
                message: 'What is your directive prefix (e.g. <prefix-a-directive></prefix-a-directive>)?',
                //},
                //{
                //    name: 'groupId',
                //    message: 'What is your Maven/Nexus groupId?'
                //},
                //{
                //    name: 'artifactId',
                //    message: 'What is your Maven/Nexus artifactId?'
                //},
                //{
                //    name: 'proxyContext',
                //    message: 'What is your REST API context to Proxy to? (e.g. /kitadmin)',
                //    validate: function (value) {
                //        value = _.str.trim(value);
                //        if (value[0] !== '/') {
                //            return 'The context should start with "/"'
                //        }
                //        if (value[value.length - 1] === '/') {
                //            return 'The context should not end with "/"';
                //        }
                //        return true;
                //    }
            }
        ];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    cofiguring: function () {
        this.copyFile('.jshintrc', '.jshintrc');
        this.copyFile('.jshintignore', '.jshintignore');
        this.copyTpl('.jscsrc', '.jscsrc', {validateIndentation: this.props.indentStyle === IndentStyle.tab ? "\t" : 4});
        this.copyFile('.gitignore', '.gitignore');
        this.copyFile('.gitattributes', '.gitattributes');

        this.copyTpl('.editorconfig', '.editorconfig', {indentStyle: this.props.indentStyle === IndentStyle.tab ? 'tab' : 'space'});
        this.copyTpl('package.json', 'package.json', {appname: this.props.appname});

        this.copyTpl('Gruntfile.js', 'Gruntfile.js', {
            proxyContext: this.props.proxyContext,
            appLess: this.props.appLess,
            groupId: this.props.groupId,
            artifactId: this.props.artifactId
        });
    },

    writing: function () {
        var that = this;

        //var beautify = require('gulp-beautify');
        //var formatting = this.props.indentSyle === IndentStyle.tab ? {indentWithTabs: true} : {indentSize: 4};
        //this.registerTransformStream(beautify(formatting));

        this.copyTpl('index.html', 'index.html', {nodeModulesDir: that.nodeDir, appname: that.appname});

        this.copyTpl('src/app.module.js', 'src/app.module.js', {appname: that.appname});
        this.copyTpl('src/app.module.less', 'src/app.module.less', {nodeModulesDir: that.nodeDir});
        this.copyTpl('src/core/core.module.js', 'src/core/core.module.js', {appname: that.appname});
        this.copyFile('src/core/core.module.less', 'src/core/core.module.less');
        this.copyTpl('src/core/core.route.js', 'src/core/core.route.js', {appname: that.appname});
        this.copyFile('src/core/config.js', 'src/core/config.js');
        this.copyFile('src/core/constants.js', 'src/core/constants.js');
        this.copyFile('src/dvbModules/router/router.module.js', 'src/dvbModules/router/router.module.js');
        this.copyFile('src/dvbModules/router/route-helper-provider.js', 'src/dvbModules/router/route-helper-provider.js');
    },

    install: function () {
        this.installDependencies();
    }
});
