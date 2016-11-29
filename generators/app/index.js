'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay('Welcome to the supreme ' + chalk.red('generator-npm-typescript') + ' generator!'));
    var prompts = [{
      type: 'String',
      name: 'name',
      message: 'Name of your npm-package'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    const filesForCopy = ['.travis.yml', 'package.json', 'tsconfig.json', 'tslint.json', '.vscode'];
    filesForCopy.map(f =>
      this.fs.copy(
        this.templatePath(f),
        this.destinationPath(f)
      )
    );
    const packageContent = this.fs.readJSON('package.json');
    packageContent.name = this.props.name;
    packageContent.version = '0.0.1';
    this.fs.writeJSON('package.json', packageContent);
  },

  install: function () {
    this.npmInstall();
  }
});
