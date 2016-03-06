'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the classy ' + chalk.red('generator-dvb-angular') + ' generator!'
        ));

        var prompts = [{
            type: 'confirm',
            name: 'someOption',
            message: 'Would you like to enable this option?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: function () {
        var that = this;

        //var beautify = require('gulp-beautify');
        //var formatting = that.indentSyle === 'space' ? {indentSize: 4} : {indentWithTabs: true};
        //that.registerTransformStream(beautify(formatting));

        var copyFile = function (src, dst) {
            that.fs.copy(that.templatePath(src), that.destinationPath(dst));
        };
        var copyTpl = function (src, dst, ejsParams) {
            that.fs.copyTpl(that.templatePath(src), that.destinationPath(dst), ejsParams);
        };

        copyFile('.jshintrc', '.jshintrc');
        copyFile('.jshintignore', '.jshintignore');
        copyFile('.jscsrc', '.jscsrc');
        copyFile('.gitignore', '.gitignore');
        copyFile('.gitattributes', '.gitattributes');

        copyTpl('.editorconfig', '.editorconfig', {indentStyle: that.indentSyle});
        copyTpl('package.json', 'package.json', {appname: that.appname});
        copyTpl('index.html', 'index.html', {nodeModulesDir: that.nodeDir, appname: that.appname});

        copyTpl('src/app.module.js', 'src/app.module.js', {appname: that.appname});
        copyTpl('src/app.module.less', 'src/app.module.less', {nodeModulesDir: that.nodeDir});
        copyTpl('src/core/core.module.js', 'src/core/core.module.js', {appname: that.appname});
        copyFile('src/core/core.module.less', 'src/core/core.module.less');
        copyTpl('src/core/core.route.js', 'src/core/core.route.js', {appname: that.appname});
        copyFile('src/core/config.js', 'src/core/config.js');
        copyFile('src/core/constants.js', 'src/core/constants.js');
        copyFile('src/dvbModules/router/router.module.js', 'src/dvbModules/router/router.module.js');
        copyFile('src/dvbModules/router/route-helper-provider.js', 'src/dvbModules/router/route-helper-provider.js');

        copyTpl('Gruntfile.js', 'Gruntfile.js', {
            proxyContext: that.proxyContext,
            appLess: that.appLess,
            groupId: that.groupId,
            artifactId: that.artifactId
        });
    },

    install: function () {
        this.installDependencies();
    }
});
